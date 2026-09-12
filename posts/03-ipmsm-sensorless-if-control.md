# IPMSM 고부하 기동 시 속도 진동 저감을 위한 I-f 오픈루프 능동 댐핑 제어 기법

> **작성자**: 진성규 (Sunggyu Jin)  
> **분류**: Motor Control / Embedded Algorithm  
> **연구 실적 연계**: 전력전자학회논문지 (TKPE Vol. 30, No. 3, 2025, DOI: [10.6113/TKPE.2025.30.3.215](https://doi.org/10.6113/TKPE.2025.30.3.215))  
> **일자**: 2026-09-11  

---

## 1. 연구 배경: 센서리스 기동 구간의 속도 진동 한계

매입형 영구자석 동기전동기(IPMSM)의 역기전력(EEMF) 기반 센서리스 제어는 모터 회전 속도가 충분히 확보되어야 유효한 역기전력 관측이 가능합니다. 따라서 정지 상태에서 일정 속도까지는 **I-f (Current-Frequency) 오픈루프 제어**를 통해 강제 구동 시퀀스를 거칩니다.

그러나 관성이 크거나 고부하 조건에서는 전동기의 토크각(Load Angle $\delta$)이 부하 토크에 의해 변동하면서 동기화 주파수 주위에서 **심각한 속도 진동(Speed Oscillation)** 및 스텝아웃(Step-out, 탈조) 현상이 발생합니다.

---

## 2. 전기적 파워 기반 소신호 상태방정식 선형화

I-f 운전 중 전동기가 소비하는 순시 유효전력 $P_e(t)$는 회전자 위상 오차 $\Delta \theta(t)$ 및 회전속도 오차 $\Delta \omega(t)$와 직접적인 물리적 상관관계를 갖습니다:

$$P_e = \frac{3}{2} \left( v_d i_d + v_q i_q \right)$$

전동기 기계적 운동방정식과 dq축 전압방정식을 정상상태 동작점 $(\omega_0, \delta_0)$ 근방에서 테일러 급수(Taylor Series) 1차 근사로 선형화하면 다음과 같은 2계 소신호 상태방정식을 도출할 수 있습니다:

$$\frac{d}{dt} \begin{bmatrix} \Delta \delta \\ \Delta \omega \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -\frac{K_s}{J} & -\frac{B}{J} \end{bmatrix} \begin{bmatrix} \Delta \delta \\ \Delta \omega \end{bmatrix} + \begin{bmatrix} 0 \\ \frac{1}{J} \end{bmatrix} \Delta T_L$$

여기서 동기화 강성 계수 $K_s$는 $\left. \frac{\partial T_e}{\partial \delta} \right|_{\delta_0}$로 정의됩니다.

---

## 3. 능동 댐핑 게인 설계 및 근궤적(Root Locus) 해석

진동을 억제하기 위해 전기적 파워의 미분 성분 또는 하이패스 필터(HPF) 통과 성분을 속도 지령 $\omega^*$에 피드백하는 **능동 댐핑 보상기(Active Damping Compensator)**를 설계합니다:

$$\omega^*(s) = \omega_{ramp}^*(s) - K_{damp} \cdot \frac{s}{s + \omega_c} P_e(s)$$

근궤적 해석을 통해 폐루프 극점(Closed-Loop Poles)이 복소 평면 좌반면에서 최적 감쇠비 $\zeta = 0.707$ 라인 상에 위치하도록 최적 댐핑 게인 $K_{damp,opt}$를 수식적으로 결정합니다.

```c
// TI TMS320F28377D DSP Core ISR Implementation Example
interrupt void MotorControl_ISR(void)
{
    // 1. Current & Voltage Sensing (ADC reading)
    float32 Vd = g_Motor.Vdq.d;
    float32 Vq = g_Motor.Vdq.q;
    float32 Id = g_Motor.Idq.d;
    float32 Iq = g_Motor.Idq.q;

    // 2. Instantaneous Active Power Calculation
    float32 Pe = 1.5f * (Vd * Id + Vq * Iq);

    // 3. High-Pass Filter & Damping Compensation
    float32 Pe_hpf = HPF_Update(&g_HPF_Pe, Pe);
    float32 w_comp = g_Kdamp_opt * Pe_hpf;

    // 4. Compensated Angular Frequency Command
    g_Motor.We_cmd = g_Motor.We_ramp - w_comp;

    // 5. Update Integrator for Electrical Angle
    g_Motor.Theta_e += g_Motor.We_cmd * TS;
    if (g_Motor.Theta_e > TWO_PI)  g_Motor.Theta_e -= TWO_PI;
    if (g_Motor.Theta_e < 0.0f)    g_Motor.Theta_e += TWO_PI;

    // Acknowledge Interrupt
    PieCtrlRegs.PIEACK.all = PIEACK_GROUP1;
}
```

---

## 4. 시뮬레이션 및 다이나모 부하 실험 검증

진공펌프용 고속 전동기를 대상으로 다이나모 벤치에서 기동 시험을 수행하였습니다.

- **기존 I-f 제어**: 500 RPM 도달 시 $\pm 85 \text{ RPM}$의 큰 속도 리플 발생 및 절환 시 과전류 트립 위험
- **제안된 능동 댐핑 I-f 제어**: 속도 리플이 **$\pm 6 \text{ RPM}$ 이하로 92.9% 급감**, 10초 이내 안정적으로 EEMF 센서리스 제어로 무충격 절환 성공

---

> 본 연구의 상세 논문은 [전력전자학회논문지(KCI 등재지) 게재 논문(DOI: 10.6113/TKPE.2025.30.3.215)](https://doi.org/10.6113/TKPE.2025.30.3.215)에서 확인하실 수 있습니다.
