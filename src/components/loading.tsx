import { Loader2 } from 'lucide-react'

export default function Loading({
    className,
  
}:{
    className?:string
}) {
  return (
    <div className={`flex items-center justify-center h-[500px]`} >
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Loading...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  )
}
