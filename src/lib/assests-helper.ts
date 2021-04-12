const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;

export const getAssetsUrl = (src: string | undefined) => {
  return src ? `${uploadsUrl}${src}` : '';
}