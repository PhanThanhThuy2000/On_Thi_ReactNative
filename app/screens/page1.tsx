import React, { useEffect, useState } from "react"; //React và các Hook như useEffect, useState để quản lý trạng thái.
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal, Button, TextInput, Alert, } from "react-native"; //giúp xây dựng UI.
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import axios from "axios"; //Dùng để gọi API lấy dữ liệu
import removeAccents from "remove-accents"; // Cài package nếu cần
// Định nghĩa kiểu RootParamList cho oStack Navigator
type RootParamList = {
    Detail: { item: SanPham };
};
//  Khai báo kiểu dữ liệu 
type SanPham = {
    id: number;
    tenSP: string;
    loaiSP: string;
    anhSP: string;
    giaSP: number;
}
type ScreenNavigationProp = StackNavigationProp<RootParamList, 'Detail'>;

const QLSP = () => {
    //const [Biến state chứa danh sách, Hàm dùng để cập nhật giá trị] = mảng rỗng<kiểu dữ liệu[]>([]);
    const [danhSachSanPham, setDanhSachSanPham] = useState<SanPham[]>([]);
    // const [dữ liệu của danh chỉnh sửa, Hàm cập nhật giá trị ] = useState<Categories | null>(null);
    const [editingDanhSachSanPham, setEditingDanhSachSanPham] = useState<SanPham | null>(null);
    const [loading, setLoading] = useState(true); // tải dữ liệu api
    const [modalVisible, setModalVisible] = useState(false); // hiện model .mặc định đang ẩn

    // search b1
    const [filteredDanhSach, setFilteredDanhSach] = useState<SanPham[]>([]); // Danh sách lọc theo tìm kiếm
    const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm

    // Sắp xếp b1
    const [sortByName, setSortByName] = useState<"asc" | "desc">("asc");

    // Lưu thông tin nhập vào
    const [tenSP, settenSP] = useState("");
    const [loaiSP, setloaiSP] = useState("");
    const [anhSP, setanhSP] = useState("");
    const [giaSP, setgiaSP] = useState("");
    const navigation = useNavigation<ScreenNavigationProp>();
    // Khi khi component được render lần đầu tiên sẽ gọi fetchData();
    useEffect(() => {
        fetchData();
    }, []);

    // HÀM HIỂN THỊ
    const fetchData = async () => { //gọi API mà không làm ứng dụng bị đơ
        try {
            //Sử dụng Axios để gửi một request GET đến API MockAPI.
            // await đảm bảo rằng React đợi cho đến khi API phản hồi trước khi tiếp tục thực thi code.
            const response = await axios.get<SanPham[]>( //Categories[] kiểu dữ liệu đã khai báo ở trên
                "https://67c3d36d89e47db83dd28ce9.mockapi.io/san_pham"
            );
            setDanhSachSanPham(response.data); //Sau khi nhận được dữ liệu từ API, ta cập nhật state categories bằng dữ liệu từ API.
            // search b2
            setFilteredDanhSach(response.data); // Cập nhật danh sách lọc ban đầu

        } catch (error) {
            console.error("API Error:", error); // thông báo lỗi
        } finally {
            setLoading(false); // luôn load lại dữ liệu cho dù api trả về thành công hay thất bại
        }
    };
    // search b3
    const handleSearch = (text: string) => {
        setSearchText(text);
        const normalizedText = removeAccents(text.toLowerCase());

        if (text.trim() === "") {
            setFilteredDanhSach(danhSachSanPham);
        } else {
            const filteredData = danhSachSanPham.filter(item =>
                removeAccents(item.tenSP.toLowerCase()).includes(normalizedText)
            );
            setFilteredDanhSach(filteredData);
        }
    };
    // Sắp xếp b2
    const sortDanhSach = (type: "name" | "price") => {
        const sortedList = [...filteredDanhSach].sort((a, b) => {
            if (type === "price") {
                return sortByName === "asc" ? a.giaSP - b.giaSP : b.giaSP - a.giaSP;
            } else {
                return sortByName === "asc"
                    ? a.tenSP.localeCompare(b.tenSP)
                    : b.tenSP.localeCompare(a.tenSP);
            }
        });

        setFilteredDanhSach(sortedList);
    };

    // HÀM LƯU DƯ LIỆU
    const handleSave = async () => {
        if (!loaiSP) return;
        // Kiểm tra các trường không được để trống
        if (!tenSP.trim() || !loaiSP.trim() || !anhSP.trim() || !giaSP.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        // Kiểm tra mã sinh viên có đúng định dạng không (chỉ chấp nhận chữ và số)
        // if (!/^[a-zA-Z0-9]+$/.test(tenSP)) {
        //     Alert.alert("Lỗi", "Mã sinh viên chỉ được chứa chữ và số.");
        //     return;  
        // }

        // Kiểm tra điểm trung bình có hợp lệ không (phải là số từ 0 đến 10)
        // const dtb = parseFloat(giaSP);
        // if (isNaN(dtb) || dtb < 0 || dtb > 10) {
        //     Alert.alert("Lỗi", "Điểm trung bình phải là số từ 0 đến 10.");
        //     return;
        //     }
        const gia = parseFloat(giaSP);
        if (isNaN(gia) || gia <= 0) {
            Alert.alert("Lỗi", "Giá sản phẩm phải là số hợp lệ và lớn hơn 0.");
            return;
        }

        // Kiểm tra URL ảnh có hợp lệ không
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
        if (!urlRegex.test(anhSP)) {
            Alert.alert("Lỗi", "Ảnh phải là URL hợp lệ (định dạng: jpg, png, jpeg, gif, svg).");
            return;
        }
        try {
            if (editingDanhSachSanPham) {
                // Gửi yêu cầu cập nhật danh mục
                await axios.put(`https://67c3d36d89e47db83dd28ce9.mockapi.io/san_pham/${editingDanhSachSanPham.id}`, {
                    tenSP,
                    loaiSP,
                    anhSP,
                    giaSP: parseFloat(giaSP),
                });

            } else {
                // Gửi yêu cầu tạo danh mục mới
                await axios.post("https://67c3d36d89e47db83dd28ce9.mockapi.io/san_pham", {
                    tenSP,
                    loaiSP,
                    anhSP,
                    giaSP: parseFloat(giaSP),
                });
            }

            fetchData(); // Gọi lại API để cập nhật danh sách
            setModalVisible(false);
        } catch (error) {
            console.error("Lỗi khi lưu danh mục:", error);
        }
    };

    // HÀM XÓA
    const handleDelete = async (id: number) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa danh mục này không?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: async () => {
                    try {
                        await axios.delete(`https://67c3d36d89e47db83dd28ce9.mockapi.io/san_pham/${id}`);
                        fetchData(); // Cập nhật danh sách sau khi xóa
                    } catch (error) {
                        console.error("Lỗi khi xóa danh mục:", error);
                    }
                },
                style: "destructive",
            },
        ]);
    };
    // HÀM HIỆN THỊ MODEL
    const openDialog = (SanPham?: SanPham) => { // tham số tùy chọn categories có kiểu Categories
        if (SanPham) { // có giá trị thì hiểu là sửa 
            setEditingDanhSachSanPham(SanPham);//Gán đối tượng vào state
            settenSP(SanPham.tenSP); //Lưu thông tin đang được chỉnh sửa
            setloaiSP(SanPham.loaiSP); //Lưu thông tin đang được chỉnh sửa
            setanhSP(SanPham.anhSP); //Lưu thông tin đang được chỉnh sửa
            setgiaSP(SanPham.giaSP.toString());
        } else { // không có giá trị hiểu là xóa
            setEditingDanhSachSanPham(null);
            settenSP("");
            setloaiSP("");
            setanhSP("");
            setgiaSP("");
        }
        setModalVisible(true);
    };
    // UI
    return (
        <View style={styles.container}>

            {/* Search b4*/}
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm sinh viên..."
                value={searchText}
                onChangeText={handleSearch}
            />
            {/* Sắp xếp b3 */}
            <TouchableOpacity
                style={styles.sortButton}
                onPress={() => {
                    setSortByName(sortByName === "asc" ? "desc" : "asc");
                    sortDanhSach("name");
                }}>
                <Text style={styles.buttonText}>
                    {sortByName === "asc" ? "Sắp xếp Z-A" : "Sắp xếp A-Z"}
                </Text>
            </TouchableOpacity>

            <FlatList
                // data={danhSachSanPham}
                data={filteredDanhSach} // search b5
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
                        <View style={styles.productItem} >
                            <Image source={{ uri: item.anhSP }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text>Ten {item.tenSP}</Text>
                                <Text>Loai {item.loaiSP}</Text>
                                <Text>Gia {item.giaSP}</Text>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.editButton} onPress={() => openDialog(item)}>
                                    <Text style={styles.buttonText}>Sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.buttonText} >Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => openDialog()}>
                <Text style={styles.addButtonText}>Thêm</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {/* Nếu editingCategories là true, tiêu đề sẽ là "Sửa" (nghĩa là sửa đổi). */}
                            {editingDanhSachSanPham ? "Sửa" : "Thêm"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={tenSP}
                            onChangeText={settenSP}
                            placeholder="Ten"
                        />
                        <Picker
                            selectedValue={loaiSP}
                            onValueChange={(itemValue) => setloaiSP(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Chọn loại sản phẩm" value="" />
                            <Picker.Item label="Điện thoại" value="Điện thoại" />
                            <Picker.Item label="Laptop" value="Laptop" />
                            <Picker.Item label="Phụ kiện" value="Phụ kiện" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            value={anhSP}
                            onChangeText={setanhSP}
                            placeholder="anhSP"
                        />
                        <TextInput
                            style={styles.input}
                            value={giaSP}
                            onChangeText={setgiaSP}
                            placeholder="giaSP"
                        />
                        <Button title="Lưu" onPress={handleSave} />
                        <Button title="Hủy" color="red" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: "#008000",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 15,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    userInfo: {
        flex: 6,
    },
    actionButtons: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    email: {
        fontSize: 16,
        color: "gray",
    },
    editButton: {
        backgroundColor: "#FFD700",
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    productImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
    productItem: { flexDirection: "row", backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 10 },
    productInfo: { flex: 6 },
    actions: {
        flex: 2,
        alignItems: "center", // Căn giữa nút trong hàng
        justifyContent: "space-around"
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    sortButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    picker: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
    }

});

export default QLSP;