import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (screen: string) => {
    setSelected(screen);
    navigation.navigate(screen);
  };
  type MenuItem = {
    name: string;
    screen: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  };
  const menuItems: MenuItem[] = [
    { name: 'page1', screen: 'page1', icon: 'home' },
    { name: 'page2', screen: 'page2', icon: 'article' },
    { name: 'page3', screen: 'page3', icon: 'chat' },
    { name: 'page4', screen: 'page4', icon: 'settings' },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-si%C3%AAu-xe-Lamborghini.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Phan Thanh Thuy</Text>
        <Text style={styles.email}>Thủy@gmail.com</Text>
      </View>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => handlePress(item.screen)}
          style={[
            styles.menuItem,
            selected === item.screen ? styles.selectedItem : null, // Đổi màu khi được chọn
          ]}
        >
          <MaterialIcons name={item.icon} size={24} color={selected === item.screen ? "#000" : "#000"} />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFD700',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  selectedItem: {
    backgroundColor: '#FFD700', // Màu vàng khi được chọn
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default CustomDrawerContent;
