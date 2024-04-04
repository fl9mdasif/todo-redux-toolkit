/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
  brand: string;
  _id?: string;
  category: string;
  color: string;
  coverPhoto: string;
  createdAt: string;
  gender: string;
  model: string;
  price: number;
  productName: string;
  quantity: number;
  rawMaterial: string;
  productDescription?: string;
  size: string;
};
export type TUpProduct = {
  _id?: string;
  brand?: string;
  category?: string;
  color?: string;
  coverPhoto?: string;
  createdAt?: string;
  gender?: string;
  model?: string;
  price?: number;
  productName?: string;
  quantity?: number;
  rawMaterial?: string;
  productDescription?: string;
  size?: string;
};

export interface SearchInputs {
  [x: string]: any;
  sortBy: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
  releasedAt: string;
  brand: string;
  model: string;
  size: string;
  category: string;
  color: string;
  gender: string;
  rawMaterial: string;
  productName: string;
}

// Memoized filtered data based on search inputs
export const filteredData = (data: SearchInputs, searchInputs: any) => {
  if (!data) return [];
  // console.log("fi", data, searchInputs);

  return data?.data?.filter((product: TProduct) => {
    // Custom logic for each column's filtering
    const lowerProduct = (product.productName || "").toLowerCase();
    const lowerBrand = (product.brand || "").toLowerCase();
    const lowerCategory = (product.category || "").toLowerCase();
    const lowerColor = (product.color || "").toLowerCase();
    const lowerGender = (product.gender || "").toLowerCase();
    const lowerRawMaterial = (product.rawMaterial || "").toLowerCase();
    const lowerSize = (product.size || "").toLowerCase();
    const lowerReleasedAt = (product.createdAt || "").toLowerCase();
    const lowerModel = (product.model || "").toLowerCase();

    return (
      lowerProduct.includes(searchInputs.productName.toLowerCase()) &&
      lowerBrand.includes(searchInputs.brand.toLowerCase()) &&
      lowerCategory.includes(searchInputs.category.toLowerCase()) &&
      lowerColor.includes(searchInputs.color.toLowerCase()) &&
      lowerGender.includes(searchInputs.gender.toLowerCase()) &&
      lowerRawMaterial.includes(searchInputs.rawMaterial.toLowerCase()) &&
      lowerSize.includes(searchInputs.size.toLowerCase()) &&
      lowerModel.includes(searchInputs.model.toLowerCase()) &&
      (product.quantity !== undefined ? product.quantity : 0) >=
        searchInputs.minQuantity &&
      (product.quantity !== undefined ? product.quantity : 0) <=
        searchInputs.maxQuantity &&
      (product.price !== undefined ? product.price : 0) >=
        searchInputs.minPrice &&
      (product.price !== undefined ? product.price : 0) <=
        searchInputs.maxPrice &&
      lowerReleasedAt.includes((searchInputs.releasedAt || "").toLowerCase())
    );
  });
};
