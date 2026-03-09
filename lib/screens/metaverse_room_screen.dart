import 'package:flutter/material.dart';

class MetaverseRoomScreen extends StatelessWidget {
  final String diseaseType;

  const MetaverseRoomScreen({Key? key, required this.diseaseType}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Metaverse Room'),
      ),
      body: Center(
        child: Stack(
          children: <Widget>[
            // Background for the metaverse room
            Container(
              color: Colors.blue[50], // Example color
            ),
            // User Avatar
            Positioned(
              left: 50,
              bottom: 50,
              child: CircleAvatar(
                radius: 30,
                backgroundColor: Colors.green,
                child: Text('U'), // User initial or avatar
              ),
            ),
            // AI Nurse
            Positioned(
              right: 50,
              bottom: 50,
              child: CircleAvatar(
                radius: 30,
                backgroundColor: Colors.yellow,
                child: Text('A'), // AI nurse initial or avatar
              ),
            ),
          ],
        ),
      ),
    );
  }
}