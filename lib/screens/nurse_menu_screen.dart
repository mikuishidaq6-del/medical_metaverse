import 'package:flutter/material.dart';
import 'health_record_screen.dart';
import 'symptom_consultation_screen.dart';
import 'health_history_screen.dart';

class NurseMenuScreen extends StatelessWidget {
  final String diseaseType;

  const NurseMenuScreen({
    super.key,
    required this.diseaseType,
  });

  @override
  Widget build(BuildContext context) {
    final double avatarRadius = MediaQuery.of(context).size.width * 0.28;

    return Scaffold(
      backgroundColor: const Color(0xFFFDF7FB),
      appBar: AppBar(
        backgroundColor: const Color(0xFFFDF7FB),
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: Color(0xFF5B4B6A)),
        title: const Text(
          '看護師メニュー',
          style: TextStyle(
            color: Color(0xFF5B4B6A),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            children: [
              const SizedBox(height: 4),
              CircleAvatar(
                radius: avatarRadius,
                backgroundColor: const Color(0xFFF7F0FF),
                backgroundImage: const AssetImage('assets/nurse.png'),
              ),
              const SizedBox(height: 14),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 18,
                  vertical: 16,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x12000000),
                      blurRadius: 10,
                      offset: Offset(0, 4),
                    ),
                  ],
                ),
                child: const Column(
                  children: [
                    Text(
                      'こんにちは。\n今日はどうしますか？',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 23,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF4F435B),
                        height: 1.3,
                      ),
                    ),
                    SizedBox(height: 6),
                    Text(
                      '気になることを選んでください',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 13,
                        color: Color(0xFF8E849A),
                        height: 1.2,
                      ),
                    ),
                    SizedBox(height: 6),
                    Text(
                      '今日も一緒に確認していきましょう',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        color: Color(0xFFA66FB5),
                        fontWeight: FontWeight.w600,
                        height: 1.2,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              Expanded(
                child: GridView.count(
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  crossAxisSpacing: 18,
                  mainAxisSpacing: 18,
                  childAspectRatio: 1.45,
                  children: [
                    _GridMenuButton(
                      icon: Icons.favorite,
                      title: '体調を\n記録する',
                      backgroundColor: const Color(0xFFFF7EB6),
                      iconColor: const Color(0xFFC62828),
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const HealthRecordScreen(),
                          ),
                        );
                      },
                    ),
                    _GridMenuButton(
                      icon: Icons.medical_services,
                      title: '症状を\n相談する',
                      backgroundColor: const Color(0xFFD7C7FF),
                      iconColor: const Color(0xFF1565C0),
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) =>
                                const SymptomConsultationScreen(),
                          ),
                        );
                      },
                    ),
                    _GridMenuButton(
                      icon: Icons.chat_bubble,
                      title: '今日のことを\n話す',
                      backgroundColor: const Color(0xFFAA82F7),
                      iconColor: Colors.white,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('準備中です...'),
                          ),
                        );
                      },
                    ),
                    _GridMenuButton(
                      icon: Icons.history,
                      title: '記録を\n見る',
                      backgroundColor: const Color(0xFFFF9AC7),
                      iconColor: const Color(0xFF7B1FA2),
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const HealthHistoryScreen(),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GridMenuButton extends StatelessWidget {
  final IconData icon;
  final String title;
  final Color backgroundColor;
  final Color iconColor;
  final VoidCallback onTap;

  const _GridMenuButton({
    required this.icon,
    required this.title,
    required this.backgroundColor,
    required this.iconColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Ink(
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: const Color(0xFFE6DDED),
              width: 1,
            ),
            boxShadow: const [
              BoxShadow(
                color: Color(0x16000000),
                blurRadius: 8,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  size: 42,
                  color: iconColor,
                ),
                const SizedBox(height: 8),
                Text(
                  title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 17,
                    height: 1.2,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF4F435B),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
