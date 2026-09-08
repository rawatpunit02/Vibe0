
import path from 'path'
import { Template, defaultBuildLogger } from 'e2b'
import { template as nextJSTemplate } from './template'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


Template.build(nextJSTemplate, "v0", {
    cpuCount: 4,
    memoryMB: 4096,
    onBuildLogs: defaultBuildLogger(),
    apiKey: process.env.E2B_API_KEY
})
