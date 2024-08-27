import React, { useState, ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { useFormikContext } from "formik";
import { toast } from "sonner";

import Placeholder from "../assets/placeholderImage.webp";
import { Edit, Trash } from "lucide-react";
import ErrorMsg from "./ErrorMsg";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from "../utils/constants";

const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;
  margin-bottom: 1rem;
  flex-direction: column;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ImagePreview = styled.div`
  width: 192px;
  height: 192px;
  border: 2px solid #d1d5db;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ClearButton = styled(Button)`
  background-color: #ef4444;

  &:hover {
    background-color: #dc2626;
  }
`;

interface ImagePickerProps {
  name: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ name }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setFieldValue, values, errors, touched } = useFormikContext<any>();

  // Check for errors and touched status for the field
  const errorMessage = touched[name] && errors[name] ? errors[name] : "";

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // File type validation check
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload an image file (JPEG, PNG)."
        );
        return;
      }
      // File size validation check
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        // Handle file size error
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
        return;
      }
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setFieldValue(name, reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setFieldValue(name, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container>
      <ImagePreviewContainer>
        <label>Image</label>
        <ImagePreview>
          {selectedImage || values[name] ? (
            <Image src={selectedImage || values[name]} alt="Selected" />
          ) : (
            <Image src={Placeholder} alt="Placeholder" />
          )}
        </ImagePreview>
      </ImagePreviewContainer>
      {errorMessage && <ErrorMsg name={name} />}
      {/* Display error message */}
      <Controls>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <Button onClick={handleSelectImage} type="button">
          <Edit width={20} />
        </Button>
        <ClearButton
          type="button"
          onClick={handleClearImage}
          disabled={!selectedImage && !values[name]}
        >
          <Trash width={20} />
        </ClearButton>
      </Controls>
    </Container>
  );
};

export default ImagePicker;
