# [템플릿] 전력전자 & 임베디드 SW 기술 아티클 표준 서식

> **작성 가이드라인**:
> 본 문서는 `tistory_tech_writer` 서브에이전트가 기술 글을 집필할 때 준수하는 표준 마크다운 서식입니다.  
> 티스토리의 KaTeX 수식 렌더러와 Prism.js 코드 하이라이터가 자동으로 변환되도록 작성되었습니다.

---

## 1. 개요 및 엔지니어링 문제 정의 (Overview)
- **대상 시스템**: (예: 10kW 급속 충전기용 3상 Vienna 정류기, IPMSM 센서리스 인버터 등)
- **직면한 과제**: (예: 저부하 영역에서의 역률 저하 및 직류단 중성점 전압 불평형 현상)
- **핵심 목표**: (예: 수식 기반 오프셋 전압 주입 알고리즘 설계를 통한 전압 밸런싱 달성)

---

## 2. 이론적 배경 및 수식 모델링 (Mathematical Modeling)
수식은 LaTeX 문법(`$...$` 인라인, `$$...$$` 블록)을 사용하여 엄밀하게 기술합니다.

### 2.1 계통 및 상태 방정식
3상 계통 전압 및 인덕터 전류의 동특성 방정식은 다음과 같이 정의됩니다:

$$
L \frac{d i_{abc}}{dt} = v_{s,abc} - v_{conv,abc} - R i_{abc}
$$

### 2.2 직류단 커패시터 중성점 전류 방정식
상단 커패시터 $C_1$과 하단 커패시터 $C_2$의 전압 오차 $\Delta V_{dc} = V_{dc1} - V_{dc2}$를 보상하기 위한 중성점 전류 $i_o$는 다음과 같습니다:

$$
i_o = (1 - |d_a|) i_a + (1 - |d_b|) i_b + (1 - |d_c|) i_c
$$

---

## 3. 임베디드 DSP 펌웨어 구현 (DSP Implementation)
C/C++ 언어 기반으로 TI TMS320F28377D DSP의 ISR(인터럽트 서비스 루틴) 내 구현 코드를 작성합니다.

```c
// ==============================================================================
// 3상 Vienna 정류기 중성점 전압 밸런싱 제어 루프 (100kHz PWM 인터럽트)
// DSP: TI TMS320F28377D Dual-Core Delfino MCU
// ==============================================================================
#pragma CODE_SECTION(epwm1_timer_isr, ".TI.ramfunc");
__interrupt void epwm1_timer_isr(void)
{
    float vdc_err = vdc_upper_meas - vdc_lower_meas;
    
    // 비례-적분(PI) 전압 밸런싱 제어기 계산
    float v_offset = PI_Controller_Update(&v_bal_pi, vdc_err);
    
    // 3상 지령 전압에 오프셋 전압 중첩 (Offset Voltage Injection)
    float v_cmd_a = v_ref_a + v_offset;
    float v_cmd_b = v_ref_b + v_offset;
    float v_cmd_c = v_ref_c + v_offset;
    
    // ePWM Duty 레지스터 갱신 (Shadow Load)
    EPwm1Regs.CMPA.bit.CMPA = (uint16_t)(v_cmd_a * PWM_PERIOD_HALF);
    EPwm2Regs.CMPA.bit.CMPA = (uint16_t)(v_cmd_b * PWM_PERIOD_HALF);
    EPwm3Regs.CMPA.bit.CMPA = (uint16_t)(v_cmd_c * PWM_PERIOD_HALF);

    // 인터럽트 플래그 클리어
    EPwm1Regs.ETCLR.bit.INT = 1;
    PieCtrlRegs.PIEACK.all = PIEACK_GROUP3;
}
```

---

## 4. 시뮬레이션 및 실물 하드웨어 실증 (Verification & Waveforms)
- **시뮬레이션 툴**: PLECS / MATLAB Simulink
- **실물 테스트 조건**: 380V 계통 입력, 750V DC 출력, 스위칭 주파수 100kHz SiC MOSFET
- **결과 파형 분석**:
  - 중성점 전압 리플 $\Delta V_{dc}$가 기존 $\pm 18\text{V}$에서 $\pm 1.2\text{V}$로 **93.3% 저감**.
  - 전류 THD(전고조파 왜곡률) 2.4% 달성.

---

## 5. 핵심 요약 및 엔지니어링 인사이트 (Key Takeaways)
1. **수식 모델과 펌웨어의 일치**: 디지털 이산화 과정에서 계산 딜레이(1 샘플 지연)를 반드시 Smith-Predictor 또는 각도 보상기로 고려해야 함.
2. **하드웨어 레이아웃 주의점**: SiC MOSFET 구동 시 기생 인덕턴스로 인한 $dv/dt$ 서지 노이즈를 억제하기 위해 R2CD 스너버 배치를 최단 거리로 구성.
