import * as Yup from "yup"; //import para el paquete instalado

const imageFormats = ["image/png", "image/svg", "image/jpeg"];

const productIni = {
  title: "",
  price: 0,
  description: "",
  category: "",
  images: null,
  photo: "",
};

export interface productInterface {
  title: string;
  price: number;
  description: string;
  category: string;
  images: null;
  photo: string;
}
/** (!data.images[0].match(/^.+\.(jpg|jpeg|png)$/g)) { //verifica la extensión
      alert('Invalid file extension');
      pass = false;
    } */
const productSchema = Yup.object().shape({
  title: Yup.string() //Valida Title
    .min(2, "Title too Short!") //Mínimo 2 caráteres
    .max(25, "Title too Long!") //Máximo 25 carácteres
    .required("Title Required"), //Obligatorio llenar
  price: Yup.number() //Valide el Precio
    .min(1, "Price too Short!") //1 es el precio mínimo
    .max(100000, "Price is up to 100000!") //Hats 100000 el precio máximo
    .required("Price Required"), //Requerido
  description: Yup.string() //Valida la descripción
    .min(6, "Description too Short!") //Mínimo 6 carácteres
    .max(100, "Description too Long!") //Máximo 100 carácteres
    .required("Description Required"), //Requerido
  category: Yup.string() //Id de categoría
    .required("Category Required"),
  photo: Yup.mixed()
    .required("You need to provide a PHOTO")
    .test("FILE_ZISE", "It's too much big", (value: any) => {
      return !value || (value && value.size <= 1024 * 1024);
    })
    .test("FILE_FORMAT", "Extension not allowed", (value: any) => {
      return !value || (value && imageFormats.includes(value.type));
    }),
});

export { productSchema, productIni };
