import { Image, Text } from 'react-konva'
import useImage from 'use-image'

export function OldDrawing({ preview }: { preview: string }) {
  const [image] = useImage(preview)
  return (
    <>
      {image ? (
        <Image image={image} alt='' />
      ) : (
        <Text fontSize={30} text='Error fetching old drawing' />
      )}
    </>
  )
}
