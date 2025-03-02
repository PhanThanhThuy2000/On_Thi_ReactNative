import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Định nghĩa kiểu SinhVien
type SinhVien = {
    id: number;
    maSV_ph48770: string;
    ten_ph48770: string;
    anh_ph48770: string;
    dtb_ph48770: number;
};

// Định nghĩa kiểu tham số cho DetailScreen
type DetailScreenRouteProp = RouteProp<{ Detail: { item: SinhVien } }, "Detail">;
type DetailScreenNavigationProp = StackNavigationProp<any>;

const DetailScreen: React.FC = () => {
    const navigation = useNavigation<DetailScreenNavigationProp>();
    const route = useRoute<DetailScreenRouteProp>(); // Lấy route từ useRoute()

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.anh_ph48770 }} style={styles.image} />
            <Text style={styles.text}>Mã SV: {item.maSV_ph48770}</Text>
            <Text style={styles.text}>Tên: {item.ten_ph48770}</Text>
            <Text style={styles.text}>Điểm trung bình: {item.dtb_ph48770}</Text>
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
