import { Text } from '@/components/core/text';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { Link } from 'expo-router';

export default function NewHome() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <Text>This should be the new home page</Text>
      <Link href="/(root)">Go to root</Link>
    </SafeAreaView>
  );
}
