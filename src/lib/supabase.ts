import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://ragkqnstwcincednpyaz.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZ2txbnN0d2NpbmNlZG5weWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MTcxODMsImV4cCI6MjAwNTA5MzE4M30.7VRTzcX603Pbg1-8wVSdLYDiwf4lWUBHwxoewenLXKA"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
