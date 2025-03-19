"use client"

import type {
  GroupProps,
  InputProps as InputPrimitiveProps,
  LabelProps,
  TextProps,
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult,
} from "react-aria-components"
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { composeTailwindRenderProps, focusStyles } from "./primitive"
import { forwardRef } from "react"

interface FieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  "aria-label"?: TextFieldPrimitiveProps["aria-label"]
  "aria-labelledby"?: TextFieldPrimitiveProps["aria-labelledby"]
}

const fieldStyles = tv({
  slots: {
    description: "text-pretty text-muted-fg text-sm/6",
    label: "w-fit cursor-default font-medium text-secondary-fg text-sm/6",
    fieldError: "text-danger text-sm/6 forced-colors:text-[Mark]",
  },
})

const { description, label, fieldError } = fieldStyles()

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <LabelPrimitive ref={ref} {...props} className={label({ className })} />
})
Label.displayName = "Label"

interface DescriptionProps extends TextProps {
  isWarning?: boolean
}

const Description = forwardRef<HTMLElement, DescriptionProps>(({ className, isWarning = false, ...props }, ref) => {
  return (
      <Text
          ref={ref}
          {...props}
          slot="description"
          className={description({ className: isWarning ? "text-warning" : className })}
      />
  )
})
Description.displayName = "Description"

class FieldErrorPrimitiveProps {
    className?: string
}

const FieldError = forwardRef<HTMLElement, FieldErrorPrimitiveProps>(({ className, ...props }, ref) => {
  return (
      <FieldErrorPrimitive
          ref={ref}
          {...props}
          className={composeTailwindRenderProps(className, fieldError())}
      />
  )
})
FieldError.displayName = "FieldError"

const fieldGroupStyles = tv({
  base: [
    "group flex h-10 items-center overflow-hidden rounded-lg border border-input shadow-xs transition duration-200 ease-out",
    "relative focus-within:ring-4 group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20",
    "[&>[role=progressbar]:first-child]:ml-2.5 [&>[role=progressbar]:last-child]:mr-2.5",
    "**:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:[button]:shrink-0",
    "[&>button:has([data-slot=icon]):first-child]:left-0 [&>button:has([data-slot=icon]):last-child]:right-0 [&>button:has([data-slot=icon])]:absolute",
    "*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-[calc(var(--spacing)*2.7)] *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-4 *:data-[slot=icon]:text-muted-fg",
    "[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-2.5",
    "[&:has([data-slot=icon]+input)]:pl-6 [&:has(input+[data-slot=icon])]:pr-6",
    "[&:has([data-slot=icon]+[role=group])]:pl-6 [&:has([role=group]+[data-slot=icon])]:pr-6",
    "has-[[data-slot=icon]:last-child]:[&_input]:pr-7",
    "*:[button]:h-8 *:[button]:rounded-[calc(var(--radius-sm)-1px)] *:[button]:px-2.5",
    "[&>button:first-child]:ml-[calc(var(--spacing)*0.7)] [&>button:last-child]:mr-[calc(var(--spacing)*0.7)]",
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]",
    },
  },
})

const FieldGroup = forwardRef<HTMLDivElement, GroupProps>(({ className, ...props }, ref) => {
  return (
      <Group
          {...props}
          ref={ref}
          className={composeRenderProps(className, (className, renderProps) =>
              fieldGroupStyles({
                ...renderProps,
                className,
              })
          )}
      />
  )
})
FieldGroup.displayName = "FieldGroup"

const Input = forwardRef<HTMLInputElement, InputPrimitiveProps>(({ className, ...props }, ref) => {
  return (
      <InputPrimitive
          ref={ref}
          {...props}
          className={composeTailwindRenderProps(
              className,
              "w-full min-w-0 bg-transparent px-2.5 py-2 text-base text-fg placeholder-muted-fg outline-hidden focus:outline-hidden sm:text-sm/6 [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden"
          )}
      />
  )
})
Input.displayName = "Input"

export type { FieldProps }
export { Description, FieldError, FieldGroup, Input, Label }
