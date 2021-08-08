import React, { useState } from 'react';
import { createListing } from './api/listings';
import { Alert, Button, Input, Typography } from '@supabase/ui';

const Index = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sku: '',
    price: '',
  });
  const [formState, setFormState] = useState('IDLE');

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormState('LOADING');

    const listing = {
      created_by: 'miral',
      ...formData,
    };

    const { data, error } = await createListing(listing);

    if (data && !error) {
      setFormState('SUCCESS');
    }
  };

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

              <Button size="large" onClick={onSubmit} loading={formState === 'LOADING'}>Create</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Index;
