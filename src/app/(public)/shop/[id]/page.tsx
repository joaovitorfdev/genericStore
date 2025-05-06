"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import SizeSelector from "../../../components/SizeSelection";
import { GetProductByID } from "../../services/productsService";
import { GetMediaLink } from "../../services/helper";
import { ProductDTO } from "../../../types/ProductDTO";
import { Size } from "@/app/types/StockDTO";
import { AddItemToCartAsync, UpdateCartItemAsync } from "../../services/cartService";
import { CartItemCreate } from "@/app/types/customer/CartDTO";
import { useAuth } from "@/context/auth/AuthContext";
import { QuantitySelector } from "../../checkout/page";

export default function ProductPage() {
  const { id } = useParams();
  const { user, fetchCustomerData } = useAuth();

  const router = useRouter();

  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!id) return;
    GetProductByID(id)
      .then((data) => {
        setProduct(data);
        const firstImg = data.images?.[0]?.image;
        if (firstImg) setMainImage(GetMediaLink(firstImg));
      })
      .catch(() => setError("Falha ao carregar produto"))
      .finally(() => setLoading(false));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      product_id: id,
      size: "",
      quantity: 1,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      size: Yup.string().required("Selecione um tamanho"),
      quantity: Yup.number()
        .min(1, "Quantidade mínima é 1")
        .max(99, "Quantidade máxima é 99")
        .required("Informe a quantidade"),
    }),
    onSubmit: async (values) => {
      if (!user) {
        router.push("/register");
        return;
      }
      const existingItem = user.cart.items.find(item =>
        item.product.id === id && item.size === formik.values.size
      )
      if(!existingItem){
        await AddItemToCartAsync(values as CartItemCreate)
      }
      else{
        await UpdateCartItemAsync(existingItem.id,  {quantity:values.quantity})
      }
  
      fetchCustomerData()
    },
  });

  const maxStock = useMemo(() => {
    if (!product) return 1;
    return (
      product.stocks?.find((p) => p.size === formik.values.size)?.quantity ?? 1
    );
  }, [product, formik.values.size]);

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-20">Produto não encontrado</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };



  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4  2xl:py-16 ">
        <main className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Galeria de Imagem */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}

              className="relative  bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img

                src={mainImage}
                alt={product.name}
                className={` object-contain transition-transform duration-300 ease-in-out ${isZoomed ? "scale-[2.5]" : "scale-100"
                  }`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={GetMediaLink(img.image ?? "")}
                  alt={`Thumb ${idx + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200 hover:border-gray-400 cursor-pointer transition-all duration-200"
                  onClick={() => setMainImage(GetMediaLink(img.image ?? ""))}
                />
              ))}
            </div>
          </div>

          {/* Detalhes e Formulário */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase">
              {product.name}
            </h1>
            {/* Form de seleção */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <SizeSelector
                stocks={product.stocks}
                selectedSize={formik.values.size as Size}
                onSizeSelect={(size) => {
                  formik.setFieldValue('size', size)
                  formik.setFieldValue('quantity', 1)
                }}
              />
              {formik.touched.size && formik.errors.size && (
                <p className="text-red-500 text-sm">{formik.errors.size}</p>
              )}

              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade</label>
                 <QuantitySelector
                                       value={formik.values.quantity}
                                       min={1}
                                       max={maxStock}
                                       onChange={(newVal) =>   formik.setFieldValue("quantity", newVal)}
                                   />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="text-red-500 text-sm">{formik.errors.quantity}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-1/2 px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  onClick={() => formik.submitForm()}
                  className="w-full sm:w-1/2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
