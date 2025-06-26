import type { RcFile } from 'syncpack'

/**
 * 定义 syncpack 配置
 * @param url - 配置文件 URL
 * @param config - 初始配置（可选）
 * @returns 最终配置
 */
export function defineConfig(url: string, config?: RcFile): RcFile
