"use client"
 
import { z } from "zod"
 
const formSchema = z.object({
  password: z.string().min(8).max(50),
  confirmPassword:z.string().min(8).max(50),
})