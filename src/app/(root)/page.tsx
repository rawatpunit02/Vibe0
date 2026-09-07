import { auth } from "@clerk/nextjs/server";
import { GlassNavbar } from "@/components/home/glass-navbar";
import { HomeBackground } from "@/components/home/home-background";
import { PromptInput } from "@/components/home/prompt-input";
import { ProjectGrid } from "@/features/projects/components/project-grid";
export default async function Home() {
  await auth.protect();

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center font-sans overflow-x-hidden w-full">
      <HomeBackground />
      <GlassNavbar />

      <main className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center px-4 py-24 sm:px-6 md:py-32">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-foreground bg-clip-text text-transparent bg-linear-to-b from-foreground via-foreground to-foreground/80">
            What do you want to build?
          </h1>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground">
            Describe your idea, app, or tool and watch it come to life with vibe0.
          </p>
        </div>

        <div className="w-full">
          <PromptInput />
        </div>
        <div>
          <ProjectGrid />
        </div>
      </main>
    </div>
  );
}
