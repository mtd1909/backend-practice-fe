export function useImageUploader() {
  const { $api } = useNuxtApp();

  const isUploading = ref(false)
  const imageUrl = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  const uploadImage = async (file: File) => {
    isUploading.value = true
    errorMessage.value = null
    const formData = new FormData()
    formData.append('image', file)
    try {
      const response = await $api('/medias', {
        method: 'POST',
        body: formData,
      })
      const url = response?.data?.url
      if (url) {
        imageUrl.value = url
        return url
      } else {
        throw new Error('Upload failed.')
      }
    } catch (error: any) {
      errorMessage.value = error?.error?.message || 'Upload failed.'
      throw error
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    imageUrl,
    isUploading,
    errorMessage,
  }
}
