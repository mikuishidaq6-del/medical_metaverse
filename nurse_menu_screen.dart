import 'package:flutter/material.dart';

class NurseMenuScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nurse Menu'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Welcome to the Nurse Menu!'),
            // Add more menu options here
            ElevatedButton(
              onPressed: () {
                // Action for button 1
              },
              child: Text('Patient Records'),
            ),
            ElevatedButton(
              onPressed: () {
                // Action for button 2
              },
              child: Text('Schedule'),
            ),
          ],
        ),
      ),
    );
  }
}