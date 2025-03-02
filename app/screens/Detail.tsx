import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Định nghĩa kiểu SanPham
type SanPham = {
    id: number;
    tenSP: string;
    loaiSP: string;
    anhSP: string;
    giaSP: number;
};

// Định nghĩa kiểu tham số cho DetailScreen
type DetailScreenRouteProp = RouteProp<{ Detail: { item: SanPham } }, "Detail">;
type DetailScreenNavigationProp = StackNavigationProp<any>;

const DetailScreen: React.FC = () => {
    const navigation = useNavigation<DetailScreenNavigationProp>();
    const route = useRoute<DetailScreenRouteProp>(); // Lấy route từ useRoute()

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.anhSP }} style={styles.image} />
            <Text style={styles.text}>Ten: {item.tenSP}</Text>
            <Text style={styles.text}>Loai: {item.loaiSP}</Text>
            <Text style={styles.text}>Gia: {item.giaSP}</Text>
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default DetailScreen;
