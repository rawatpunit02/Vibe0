"use server"

import { getCurrentUser } from "@/features/auth/actions";
import { inngest } from '@/features/inngest/client'
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { err } from "inngest/types";
import { generateSlug } from "random-word-slugs";


export const createProject = async (value: string) => {

    const user = await getCurrentUser();

    if (!user) {
        return {
            error: "Unauthorized"
        }
    }

    try {
        const project = await prisma.project.create({
            data: {
                name: generateSlug(2, { format: "kebab" }),
                userId: user.id,
                messages: {
                    create: {
                        content: value,
                        role: MessageRole.USER,
                        type: MessageType.RESULT
                    }
                }

            }
        })
        await inngest.send({
            name: "code-agent/run",
            data: {
                value,
                projectId: project.id,

            }
        })


        return project;
    } catch (error) {
        console.log("Error in project create ", error);
        return {
            error: "Error creating project"
        }
    }

}

export const getProjects = async () => {
    const user = await getCurrentUser()
    if (!user) {
        return {
            error: "Unauthorized"
        }
    }
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc",
            }
        })
        return projects;
    } catch (error) {
        console.log("error in projects get", error);
        return {
            error: "Error getting projects"
        }
    }
}
export const getProject = async (id: string) => {

    const user = await getCurrentUser()

    if (!user) {
        return {
            error: "Unauthorized"
        }
    }
    try {
        const project = await prisma.project.findUnique({
            where: {
                id,
                userId: user.id
            },
            include: {
                messages: true,
            }
        })
        if (!project) {
            return {
                error: "Project not found",
            }
        }

        return project;


    } catch (error) {
        console.log("error in project get", error);
        return {
            error: "Error getting project"
        }
    }
}