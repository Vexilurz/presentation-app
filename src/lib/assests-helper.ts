const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;

export const getAssetsUrl = (src: string) => {
  return `${uploadsUrl}${src}`
}