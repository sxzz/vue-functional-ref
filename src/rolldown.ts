import rollup from './rollup'
import type { Plugin } from 'rolldown'

const rolldown = rollup as () => Plugin
export default rolldown
