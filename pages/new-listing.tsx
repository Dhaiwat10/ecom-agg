/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { createListing, uploadImage } from './api/listings';
import { Alert, Button, Input, Typography } from '@supabase/ui';
import { useDropzone } from 'react-dropzone';

const Index = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sku: '',
    price: '',
  });
  const [files, setFiles] = useState([]);
  const [formState, setFormState] = useState('IDLE');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormState('LOADING');

    if (
      files.length === 0 ||
      formData.sku.length === 0 ||
      formData.price.length === 0 ||
      formData.title.length === 0 ||
      formData.description.length === 0
    ) {
      setFormState('ERROR');
      return;
    }

    const image_file_names = files.map((file, idx) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${idx}.${fileExt}`;
      return fileName;
    });

    const listing = {
      created_by: 'nazeeh',
      image_file_names,
      ...formData,
    };

    const { data } = await createListing(listing);

    const listingId = data[0].id;

    await Promise.all(
      files.map((file, idx) => uploadImage(file, listingId, idx))
    );
    setFormState('SUCCESS');
  };

  const thumbs = (
    <div className='flex gap-4 w-full'>
      {files.map((file) => (
        <div key={file.name} className='h-32'>
          <img
            className='rounded-lg object-cover h-full border-2'
            src={file.preview}
            alt='image'
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className='mx-auto w-auto'>
      {formState === 'SUCCESS' ? (
        <div>
          <Alert withIcon title='Success'>
            Listing created successfully!
          </Alert>{' '}
        </div>
      ) : (
        <div>
          <Typography.Text strong style={{ fontSize: '2rem' }}>
            Create a new listing
          </Typography.Text>

          <form className='flex flex-col gap-6 mt-6 w-11/12 lg:w-6/12 lg:mx-0 mx-auto'>
            <Input
              label='Title'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input.TextArea
              label='Description'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <Typography.Text>Upload Images</Typography.Text>
            <div
              {...getRootProps()}
              className='cursor-pointer p-6 border-2 border-dashed rounded-lg text-center'
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here</p>
              ) : (
                <p>Drag and drop some files here, or click to select files.</p>
              )}
            </div>
            <aside>{thumbs}</aside>

            <Input
              label='Price'
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Input
              label='SKU'
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />

            <Button
              size='large'
              onClick={onSubmit}
              loading={formState === 'LOADING'}
            >
              Create
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Index;
