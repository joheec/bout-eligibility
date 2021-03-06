import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthService from '../services/Auth';
import DatabaseService from '../services/Database';

export default function HomeScreen({ navigation, screenProps }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    DatabaseService.getEligibility().then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.boutsContainer}>
        {
          screenProps.map(bout => (
            <TouchableOpacity
              key={bout.boutId}
              onPress={() => navigation.navigate('Bout', { boutId: bout.boutId })}
            >
              <View style={styles.boutContainer}>
                <Text style={styles.linkText}>
                  {bout.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        }
        </View>
        <DevelopmentModeNotice />
      </ScrollView>
      <TouchableOpacity onPress={AuthService.logout} style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.linkText}>
        Learn more
      </Text>
    );

    return (
      <View style={styles.getStartedContainer}>
        <Text style={styles.developmentModeText}>
          Development mode is enabled: your app will be slower but you can use useful development tools. {learnMoreButton}
        </Text>
        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress}>
            <Text style={styles.linkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return null;
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  boutsContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  boutContainer: {
    paddingTop: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 20,
    color: '#2e78b7',
  },
});
