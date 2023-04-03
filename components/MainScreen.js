import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image  } from 'react-native'
import SearchBar from './SearchBar'

export default function MainScreen ({ route, navigation }) {
  const [news, setNews] = useState()
  
  useEffect(() => {
    const rss = route.params.rss
    // Set header title
    navigation.setOptions({ title: rss.title})

    // Make array of news
    const news = []
    rss.items.forEach(item => { 
      
      // Check if image exists
      let imgUrl = null
      enclosure = item.enclosures.pop()
      if (enclosure !== undefined)
        imgUrl = enclosure.url

      // Add news to array
      news.push({
        id: item.id,
        title: item.title,
        description: item.description,
        img: imgUrl,
        published: item.published
      })
      setNews(news)
    })
  }, [])

  const [searchNews, setSearchNews] = useState ([])
  const [isSearch, setIsSearch] = useState(false)

  const findNews = (inputText) => {
    setSearchNews((list) => {
        if (inputText.length == 0) {
            setIsSearch(false);
            return []
        }
        list = news.filter(item => (
            item.title.toLowerCase().includes(inputText.toLowerCase())|| 
            item.description.toLowerCase().includes(inputText.toLowerCase())
        ));   
        setIsSearch(true);
      return [...list]
    })
}

  return (
    <View style={styles.wrap}>
      <SearchBar findNews={findNews}/>
      <FlatList 
        data={isSearch ? searchNews : news} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.article}
            onPress={() => 
              navigation.navigate(
              'News', 
              {...item}
              )
            }
          >
            <Text style={styles.title}>
              { item.title }
            </Text>
            <View style={styles.container}>
              <View style={styles.textWrap}>
                <Text 
                  numberOfLines={3} 
                  style={styles.description}
                >
                  { item.description }
                </Text>
              </View>
              
                {
                  item.img !== null
                  ? <View style={styles.imageWrap}>
                      <Image 
                        style={styles.image} 
                        source={{
                          uri:`${item.img}`, 
                          width:100, 
                          height:100 
                        }}
                      />
                    </View>
                  :
                    <></>
                }
              
            </View>
            <Text 
              style={styles.published}
            >
              { item.published }
            </Text>
          </TouchableOpacity>     
        )} 
      />            
    </View >  
  )
}

const styles =  StyleSheet.create({
  wrap: {
    height: '100%'
  },
  article: {
    borderColor : 'black',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 2
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  imageWrap: {
    flex: 1
  },
  textWrap: {
    flex: 2
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  description: {
    color: 'white',
    fontSize: 15
  },
  image: {
    borderRadius: 100,
    marginLeft: 'auto'
  },
  published: {
    color: '#FF5858',
    fontStyle: 'italic',
    marginTop: 2
  }
})
