// composables/useAssets.ts
import { filename } from 'pathe/utils'

// Vite needs a literal glob pattern, so the tech logos are resolved once at module
// scope and looked up by basename. Keep the extensions in sync with the files in
// app/assets/img/techs — a logo whose extension is missing here renders as nothing.
const modules = import.meta.glob<{ default: string }>(
    '~/assets/img/techs/*.{svg,png,webp}',
    { eager: true },
)

const logos: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, module]) => [filename(path), module.default]),
)

export default function useAssets(path: string) {
    const name = filename(path)
    return name ? logos[name] ?? '' : ''
}
