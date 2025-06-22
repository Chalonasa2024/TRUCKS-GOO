
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

// Custom hook for merging refs
function useMergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | null | undefined>) {
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null
    }
    
    return (value: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value
        }
      })
    }
  }, [refs])
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
  }
>(({ className, indeterminate, ...props }, ref) => {
  const innerRef = React.useRef<React.ElementRef<typeof CheckboxPrimitive.Root>>(null)
  const combinedRef = useMergeRefs([ref, innerRef])

  React.useEffect(() => {
    if (innerRef.current && 'indeterminate' in innerRef.current) {
      // TypeScript doesn't know about the indeterminate property on checkbox elements
      // @ts-ignore
      innerRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <CheckboxPrimitive.Root
      ref={combinedRef}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {indeterminate ? <Minus className="h-3 w-3" /> : <Check className="h-4 w-4" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
