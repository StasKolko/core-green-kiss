import { IsValidFileParams } from "../_domain/types";

export const isValidFile = ({
  fileType,
  fileSize,
  allowedFileTypes,
  maxFileSize,
}: IsValidFileParams): void => {
  if (!allowedFileTypes.includes(fileType)) {
    throw new Error(
      `Тип файла не подходит. Вы можете загрузить только: ${allowedFileTypes.join(", ")}.`,
    );
  }

  if (fileSize > maxFileSize) {
    throw new Error(
      `Файл слишком большой. Оптимизируйте изображение. Максимальный размер: ${maxFileSize / 1024 / 1024} Мб.`,
    );
  }
};
