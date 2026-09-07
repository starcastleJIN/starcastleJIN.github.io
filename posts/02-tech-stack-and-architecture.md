# 2025년 웹 개발 트렌드와 클린 코드 아키텍처

소프트웨어 개발에서 코드는 한 번 작성되지만, 수십 수백 번 읽히고 수정됩니다.
이번 글에서는 프론트엔드와 백엔드를 아우르는 **클린 코드 아키텍처 원칙**과 **유지보수성 높은 코드 작성법**을 다룹니다.

---

## 1. 단일 책임 원칙 (Single Responsibility Principle)

하나의 함수나 컴포넌트는 오직 **하나의 이유로만 변경**되어야 합니다.
UI 렌더링, 데이터 페칭, 비즈니스 로직이 한 컴포넌트에 섞여 있으면 테스트와 유지보수가 매우 어려워집니다.

### ❌ 개선이 필요한 코드

```typescript
// 데이터 요청과 UI 렌더링, 에러 핸들링이 혼재된 형태
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => alert("에러 발생!"));
  }, [userId]);

  if (!user) return <div>로딩 중...</div>;
  return <div>{user.name} ({user.email})</div>;
}
```

### ✅ 개선된 코드 (Custom Hook 분리)

```typescript
// 1. 비즈니스 로직 및 페칭 분리
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    userService.fetchById(userId)
      .then(data => { if (isMounted) setUser(data); })
      .catch(err => { if (isMounted) setError(err); })
      .finally(() => { if (isMounted) setLoading(false); });

    return () => { isMounted = false; };
  }, [userId]);

  return { user, loading, error };
}

// 2. 순수 UI 렌더링 컴포넌트
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <UserCard user={user} />;
}
```

---

## 2. 예측 가능한 상태 관리

상태(State)는 최소한으로 유지하고, 계산 가능한 파생 상태(Derived State)는 별도의 state로 만들지 않는 것이 버그를 줄이는 지름길입니다.

| 안티 패턴 | 권장 패턴 |
| :--- | :--- |
| `firstName`, `lastName`, `fullName` 모두 state로 관리 | `firstName`, `lastName`만 state로 두고 `fullName = `${firstName} ${lastName}``로 계산 |
| 여러 곳에서 동일한 데이터의 복사본을 각각 보관 | 단일 진실 공급원(Single Source of Truth) 유지 |
| 복잡한 조건부 플래그 변수 남발 | 상태 머신(State Machine) 또는 명확한 열거형(Enum) 사용 |

---

## 3. 선언형 코드 작성하기

"어떻게(How)" 할 것인지보다 "무엇을(What)" 할 것인지를 명시하는 선언형 프로그래밍은 코드의 가독성을 비약적으로 높여줍니다.

```python
# 명령형 방식 (How)
active_users = []
for user in users:
    if user.is_active:
        active_users.append(user.name.upper())

# 선언형 방식 (What)
active_user_names = [
    user.name.upper()
    for user in users
    if user.is_active
]
```

---

## 📌 마무리하며

좋은 아키텍처는 거창한 프레임워크나 라이브러리에서 나오는 것이 아니라, **작은 함수와 변수 이름을 신중하게 짓고 역할을 명확히 나누는 습관**에서 출발합니다.

더 나은 코드를 만들기 위한 지속적인 리팩터링을 두려워하지 마세요!
