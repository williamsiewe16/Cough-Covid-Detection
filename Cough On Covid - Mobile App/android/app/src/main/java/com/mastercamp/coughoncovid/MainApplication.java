package com.mastercamp.coughoncovid;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.dooboolab.audiorecorderplayer.RNAudioRecorderPlayerPackage;
import com.reactnativerestart.RestartPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.horcrux.svg.SvgPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.mastercamp.coughoncovid.generated.BasePackageList;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList(),
    Arrays.<SingletonModule>asList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNAudioRecorderPlayerPackage(),
            new RestartPackage(),
            new RNCWebViewPackage(),
            new RNI18nPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new SnackbarPackage(),
            new SvgPackage(),
            new RNFetchBlobPackage(),
            new GeolocationPackage(),
            new MapsPackage(),
            new SQLitePluginPackage(),
          new ReanimatedPackage(),
          new RNGestureHandlerPackage(),
          new RNScreensPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
