export const fotmatToReactSelect = (list, datas) => {
  if (!list || !datas) return;

  if (Array.isArray(datas)) {
    return datas.map((data) => ({
      value: data,
      label: list.find((element) => element.value === data)?.label,
    }));
  } else return { value: datas, label: list.find((element) => element.value === datas)?.label };
};
