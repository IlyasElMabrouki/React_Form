import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export const YoutubeForm = () => {
  const form = useForm({
    defaultValues: async ()=>{
      const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1")
      return {
        username: "",
        email: data.email,
        channel: "",
        social: {
          twitter: "",
          facebook: ""
        },
        phoneNumbers: ["", ""],
      }
    }
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log('Form Submitted');
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'UserName is required',
          })}
        />
        <p>{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register('email', {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid Email Format',
            },
            required: 'Email is required',
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== 'admin@example.com' ||
                  'Enter a different email address'
                );
              },
            },
          })}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register('channel', {
            required: 'Channel is required',
          })}
        />
        <p>{errors.channel?.message}</p>

        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register('social.twitter')} />

        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register('social.facebook')} />

        <label htmlFor="primary-phone">Primary Phone number</label>
        <input type="text" id="primary-phone" {...register('phoneNumbers.0')} />

        <label htmlFor="secondary-phone">Secondary Phone number</label>
        <input type="text" id="secondary-phone" {...register('phoneNumbers.1')} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
