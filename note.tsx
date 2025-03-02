import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const API_URL = "https://mockapi.io/projects/YOUR_API"; // Thay bằng API thật

const ProductList = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Lỗi lấy dữ liệu:", error);
        }
    };

    const deleteProduct = async (id) => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa", onPress: async () => {
                    await axios.delete(`${API_URL}/products/${id}`);
                    fetchProducts();
                }
            }
        ]);
    };

    const filterProducts = products.filter(p =>
        p.name.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, ''))
    );

    return (
        <View>
            <TextInput
                placeholder="Tìm kiếm sản phẩm..."
                onChangeText={setSearch}
                value={search}
            />
            <FlatList
                data={filterProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
                        <Text>{item.name} - {item.price} VNĐ</Text>
                        <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                            <Text>Xóa</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity onPress={() => navigation.navigate("AddEdit")}>
                <Text>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

const AddEditProduct = ({ route, navigation }) => {
    const { product } = route.params || {};
    const [name, setName] = useState(product?.name || "");
    const [image, setImage] = useState(product?.image || "");
    const [price, setPrice] = useState(product?.price || "");
    const [category, setCategory] = useState(product?.category || "Điện thoại");

    const handleSave = async () => {
        if (!name || !image || !price) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const data = { name, image, price, category };
        if (product) {
            await axios.put(`${API_URL}/products/${product.id}`, data);
        } else {
            await axios.post(`${API_URL}/products`, data);
        }
        navigation.goBack();
    };

    return (
        <View>
            <TextInput placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
            <TextInput placeholder="Link ảnh" value={image} onChangeText={setImage} />
            <TextInput placeholder="Giá bán" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item label="Điện thoại" value="Điện thoại" />
                <Picker.Item label="Laptop" value="Laptop" />
                <Picker.Item label="Phụ kiện" value="Phụ kiện" />
            </Picker>
            <TouchableOpacity onPress={handleSave}><Text>Lưu</Text></TouchableOpacity>
        </View>
    );
};

export { ProductList, AddEditProduct };
