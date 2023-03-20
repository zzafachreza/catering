import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import axios from 'axios';
import { urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function Kategori({ navigation, route }) {
  navigation.setOptions({
    title: route.params.nama_kategori
  });

  const [data, setData] = useState([]);

  const getDataSubKategori = () => {
    axios.post(urlAPI + '/1data_subkategori.php', {
      fid_kategori: route.params.fid_kategori
    }).then(res => {
      console.log('subkategori', res.data);

      setData(res.data);
    })
  }

  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Barang', {
        fid_subkategori: item.id
      })} style={{
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: 5,
        padding: 10,
      }}>
        <View>
          <Image style={{
            width: 80,
            height: 80
          }} source={{
            uri: item.image
          }} />
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>{item.nama_subkategori}</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} />
        </View>
      </TouchableOpacity>
    )
  }


  useEffect(() => {
    getDataSubKategori();
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.border_list
    }}>
      <FlatList data={data} renderItem={__renderItem} />
    </SafeAreaView>
  )
}

