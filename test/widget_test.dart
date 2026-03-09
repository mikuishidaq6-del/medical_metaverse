import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:medical_metaverse/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MedicalMetaverseApp());

    // Verify that the login screen is displayed.
    expect(find.text('ログイン'), findsOneWidget);
  });
}
