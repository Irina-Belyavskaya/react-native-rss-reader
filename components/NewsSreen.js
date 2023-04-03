import { WebView } from 'react-native-webview'

export default function NewsScreen ({ route, navigation }) {
  navigation.setOptions({ title: route.params.title.trim() })
  return (
    <>
      <WebView source={{ uri: `${route.params.id}` }} />
    </>
  )
}