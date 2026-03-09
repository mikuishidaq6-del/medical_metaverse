import 'package:flutter/material.dart';
import 'nurse_menu_screen.dart';

class MetaverseRoomScreen extends StatelessWidget {
  final String diseaseType;

  const MetaverseRoomScreen({Key? key, required this.diseaseType}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('メタバースルーム ($diseaseType)'),
        centerTitle: true,
      ),
      body: Center(
        child: Stack(
          children: <Widget>[
            // Background for the metaverse room
            Container(
              color: Colors.blue[50],
            ),
            // User Avatar
            const Positioned(
              left: 50,
              bottom: 50,
              child: CircleAvatar(
                radius: 30,
                backgroundColor: Colors.green,
                child: Text('U'),
              ),
            ),
            // AI Nurse (tap to open nurse menu)
            Positioned(
              right: 50,
              bottom: 50,
              child: GestureDetector(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => NurseMenuScreen(
                        diseaseType: diseaseType,
                      ),
                    ),
                  );
                },
                child: const CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.yellow,
                  child: Text('A'),
                ),
              ),
            ),
            // Instruction label
            const Positioned(
              bottom: 100,
              left: 0,
              right: 0,
              child: Text(
                'AI看護師をタップして相談する',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.blueGrey),
              ),
            ),
          ],
        ),
      ),
    );
  }
}