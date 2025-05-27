export const useProfile = () => {
  const { $api } = useNuxtApp();
  const getProfile = async () => {
    const res = await $api.profile.getProfile();
    return res.data;
  };

  return {
    getProfile,
  };
};
