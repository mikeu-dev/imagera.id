<script>
  let { 
    type = 'button', 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    onclick, 
    children, 
    ...props 
  } = $props();

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
</script>

<button
  {type}
  class="{baseClasses} {variants[variant]} {sizes[size]}"
  {disabled}
  {onclick}
  {...props}
>
  {@render children?.()}
</button>
