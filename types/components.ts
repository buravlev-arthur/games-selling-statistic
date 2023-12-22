export type PlatformName = 'Steam' | 'Xbox' | 'PlayStation'
export type PlatformOptions = Array<{
  label: string
  value: PlatformName | 'all'
}>
