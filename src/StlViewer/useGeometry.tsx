import { STLLoader } from 'three-stdlib/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { BufferGeometry, NormalBufferAttributes } from 'three'

export const useGeometry = (
  url: string,
  model: string | ArrayBuffer | undefined,
  extraHeaders: Record<string, string> | undefined
): BufferGeometry<NormalBufferAttributes> => {
  const geometry = useMemo(() => {
    if (model !== undefined) {
      return new STLLoader().parse(model)
    } else {
      return useLoader(STLLoader, url, (loader) => {
        loader.setRequestHeader(extraHeaders ?? {})
      })
    }
  }, [model, url, extraHeaders])
  return geometry
}
