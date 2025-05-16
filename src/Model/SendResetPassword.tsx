 
import { z } from "zod"
 
const formSchema = z.object({
  Email: z.string().min(2).max(50),
})