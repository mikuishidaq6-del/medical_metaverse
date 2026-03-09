import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const MedicalMetaverseApp());
}

class MedicalMetaverseApp extends StatelessWidget {
  const MedicalMetaverseApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '血液がん患者向け療養支援メタバース',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}