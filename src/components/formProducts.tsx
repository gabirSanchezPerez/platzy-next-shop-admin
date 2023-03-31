import React, { useRef } from "react";
import { Formik, Field, Form } from "formik";
import { productSchema, productInterface, productIni } from "../common/productSchema";
import PreviewImage from "@/src/common/previewImage";

import { usePost } from "@/src/hooks/useFetch";
import endPoints from "@/src/services/api";

export default function FormProduct() {
  const formRef = useRef(null);

  const handleSubmit = async (data: productInterface) => {
    //const formData = new FormData(formRef.current);
    //formData.get("description"),
    const data2 = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.category,
      images: [data.photo.name],
    };
    await usePost(endPoints.products.postProducts, data2)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={productIni}
      validationSchema={productSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="w-100" ref={formRef}>
          <div className="overflow-hidden">
            <div className="pb-4 bg-white ">
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Field type="text" name="title" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {errors.title && touched.title ? (
                    <div className="flex bg-red-100 rounded p-2 mt-1 text-xs text-red-700 border-red-700" role="alert">
                      {errors.title}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <Field type="number" name="price" id="price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {errors.price && touched.price ? (
                    <div className="flex bg-red-100 rounded p-2 mt-1 text-xs text-red-700 border-red-700 " role="alert">
                      {errors.price}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Category</option>
                    <option value="1">Clothes</option>
                    <option value="2">Electronics</option>
                    <option value="3">Furniture</option>
                    <option value="4">Toys</option>
                    <option value="5">Others</option>
                  </Field>
                  {errors.category && touched.category ? (
                    <div className="flex bg-red-100 rounded p-2 mt-1 text-xs text-red-700 border-red-700 " role="alert">
                      {errors.category}
                    </div>
                  ) : null}
                </div>

                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    autoComplete="description"
                    rows={3}
                    className="form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                  />
                  {errors.description && touched.description ? (
                    <div className="flex bg-red-100 rounded p-2 mt-1 text-xs text-red-700 border-red-700 " role="alert">
                      {errors.description}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <div>
                    <label htmlFor="#" className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {values.photo ? (
                          <>
                            <PreviewImage file={values.photo} />
                            <p className="text-sm text-gray-500">{values.photo.name}</p>
                          </>
                        ) : (
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <label htmlFor="photo" className="">
                          <span className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload a file
                          </span>
                          <input
                            type="file"
                            id="photo"
                            name="photo"
                            className="sr-only"
                            onChange={(evt) => {
                              setFieldValue("photo", evt.target.files[0]);
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    {errors.photo && touched.photo && (
                      <div className="flex bg-red-100 rounded p-2 mt-1 text-xs text-red-700 border-red-700 " role="alert">
                        {errors.photo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
