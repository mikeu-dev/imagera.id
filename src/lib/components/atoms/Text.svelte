<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label';
    variant?: 'headline' | 'body' | 'muted' | 'error' | 'success' | 'white';
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right';
    children?: Snippet;
    class?: string;
    class?: string;
  }

  let { 
    tag = 'p', 
    variant = 'body', 
    weight = 'normal', 
    align = 'left', 
    children, 
    ...props 
  }: Props = $props();

  const tags: Record<string, string> = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    p: 'text-base font-normal leading-7',
    span: 'text-base font-normal',
    label: 'text-sm font-medium text-gray-700'
  };

  const variants: Record<string, string> = {
    headline: 'text-gray-900',
    body: 'text-gray-600',
    muted: 'text-gray-400',
    error: 'text-red-500',
    success: 'text-green-500',
    white: 'text-white'
  };

  const weights: Record<string, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const aligns: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
</script>

<svelte:element
  this={tag}
  class="{tags[tag] || ''} {variants[variant] || ''} {weights[weight] || ''} {aligns[align] || ''} {props.class || ''}"
>
  {@render children?.()}
</svelte:element>
