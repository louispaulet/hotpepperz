function VisualImage({ src, alt, item, className = '', imgClassName = '' }) {
  const isProduct = item?.presentation === 'product'

  return (
    <div
      className={`${className} ${isProduct ? 'bg-[var(--image-backdrop)]' : ''}`}
      style={isProduct ? { '--image-backdrop': item.backdrop } : undefined}
    >
      <img
        src={src}
        alt={alt}
        className={`${isProduct ? 'h-full w-full object-contain p-2 sm:p-3 drop-shadow-[0_24px_38px_rgba(0,0,0,0.35)]' : 'h-full w-full object-cover'} ${imgClassName}`}
        style={isProduct ? undefined : { objectPosition: item?.position }}
      />
    </div>
  )
}

export default VisualImage
