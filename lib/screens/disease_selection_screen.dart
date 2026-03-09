import 'package:flutter/material.dart';
import 'metaverse_room_screen.dart';

class DiseaseSelectionScreen extends StatefulWidget {
  const DiseaseSelectionScreen({Key? key}) : super(key: key);

  @override
  State<DiseaseSelectionScreen> createState() => _DiseaseSelectionScreenState();
}

class _DiseaseSelectionScreenState extends State<DiseaseSelectionScreen> {
  String? _selectedDisease;

  final List<Map<String, String>> diseases = [
    {'name': '白血病', 'icon': '🩸'},
    {'name': 'リンパ腫', 'icon': '🔴'},
    {'name': '多発性骨髄腫', 'icon': '💊'},
    {'name': 'その他の血液疾患', 'icon': '🏥'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('疾患タイプ選択'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 24),
            const Text(
              'あなたの疾患タイプを選択してください',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 32),
            ...diseases.map((disease) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Card(
                  child: ListTile(
                    leading: Text(disease['icon']!, style: const TextStyle(fontSize: 32)),
                    title: Text(disease['name']!),
                    trailing: Radio<String>(
                      value: disease['name']!,
                      groupValue: _selectedDisease,
                      onChanged: (value) {
                        setState(() => _selectedDisease = value);
                      },
                    ),
                    onTap: () {
                      setState(() => _selectedDisease = disease['name']!);
                    },
                  ),
                ),
              );
            }).toList(),
            const Spacer(),
            ElevatedButton(
              onPressed: _selectedDisease != null
                  ? () {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (context) => MetaverseRoomScreen(
                            diseaseType: _selectedDisease!,
                          ),
                        ),
                      );
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('メタバースルームへ'),
            ),
          ],
        ),
      ),
    );
  }
}
