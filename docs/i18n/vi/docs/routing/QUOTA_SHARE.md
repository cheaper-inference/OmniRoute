# Quota Sharing Engine (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Tham chiếu tài liệu**: `docs/routing/QUOTA_SHARE.md`
> Thuộc Nhóm B (kế hoạch 16 + 22).

---

## Tổng quan

Quota Sharing Engine phân phối hạn mức dựa trên thời gian của nhà cung cấp (ví dụ: cửa sổ
5 giờ của Codex, 1500 req/h của Kimi) một cách công bằng giữa nhiều khóa API dùng chung
một kết nối.

**Vấn đề được giải quyết:** OmniRoute dùng nhiều khóa API để truy cập cùng một tài khoản
nhà cung cấp thượng nguồn. Nếu không có logic chia sẻ, lưu lượng tăng đột biến từ khóa A có thể làm cạn
hạn mức của nhà cung cấp trong giờ đó, khiến các khóa B và C bị chặn cho đến khi cửa sổ được đặt lại.
Engine ngăn chặn điều này bằng cách:

1. Theo dõi mức tiêu thụ trượt của từng khóa theo mỗi chiều (%, yêu cầu, token, $).
2. Áp dụng thuật toán chia sẻ công bằng bảo toàn công việc: một khóa có thể mượn từ các
   phần chia đang nhàn rỗi khi nhóm toàn cục chưa bão hòa.
3. Thực thi kết quả trên đường dẫn nóng (`chatCore.ts`) trước khi yêu cầu
   đến trình thực thi thượng nguồn.

---

## Thuật toán: Chia sẻ công bằng-Tiết kiệm công việc

Được triển khai trong `src/lib/quota/fairShare.ts`.

### Chế độ

| Tình trạng                                 | Cách thức       | Hành vi                                                               |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Hào phóng**   | Chìa khóa có thể vay tới giới hạn toàn cầu trừ đi tổng lượng tiêu thụ |
| `globalUsedPercent >= saturationThreshold` | **Nghiêm ngặt** | Thực thi chia sẻ công bằng cá nhân một cách nghiêm ngặt               |

`saturationThreshold = 0.5` mặc định (env `QUOTA_SATURATION_THRESHOLD`).

Hai chế độ này mô tả một nhóm ở chế độ mượn mặc định, `saturation`. Nhóm ở chế độ `consent` luôn áp dụng các quy tắc nghiêm ngặt, bất kể độ bão hòa. Xem [Cho vay được đồng ý (chọn tham gia trên mỗi nhóm)](#consented-lending-per-pool-opt-in).

### Quyết định theo chiều

Đối với mỗi thứ nguyên hoạt động trong nhóm, công cụ sẽ tính toán:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Đối với thứ nguyên `percent`, thay vào đó, `consumed` xuất phát từ sổ ghi công (xem [Thứ nguyên phần trăm: ghi công cho mỗi khóa](#percent-dimensions-per-key-attribution) ).

Sau đó:

- **`policy = hard`** : nếu `consumed > fairShareAllowed` và chế độ là → nghiêm ngặt** khối** .
- **`policy = soft`** : nếu `consumed > fairShareAllowed` và chế độ là → nghiêm ngặt** trừng phạt** (loại bỏ ưu tiên trong combo; không bao giờ chặn cứng).
- **`policy = burst`** : cho phép trong khi khoảng trống toàn cầu tồn tại bất kể chia sẻ công bằng.

### nắp tuyệt đối

`capValue` + `capUnit` trên phân bổ là mức trần cứng độc lập với chế độ hoặc chính sách. Bất kỳ chiều nào mà `consumed >= capValue` luôn** khối** yêu cầu. Đối với giới hạn `percent`, `consumed` chỉ là phần được gán cho khóa.

### Kiểm tra đa chiều

Một yêu cầu sẽ bị chặn nếu** bất kì** kích thước trong nhóm sẽ chặn nó. Thứ nguyên là độc lập — mức cạn kiệt 5h% không ảnh hưởng đến thứ nguyên% hàng tuần.

### Vay

Ở chế độ hào phóng, một khóa có mức phân bổ chưa được sử dụng đầy đủ có thể sử dụng phần thặng dư từ các cổ phần chưa được phân bổ của các khóa khác. Công thức là:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

`consumedByOtherKeys = consumedTotal - consumedByThisKey` đâu. Toàn cầu teto (tổng `limit` cho chiều đó) luôn là trần cứng.

### Cho vay được đồng ý (chọn tham gia trên mỗi nhóm)

Mỗi nhóm có một chế độ vay. `saturation` là mặc định và giữ nguyên các quy tắc ở trên. Trong chế độ `consent`, khóa `hard` chỉ chuyển phần chia sẻ của nó trong phạm vi dung lượng mà các khóa khác đã đồng ý cho vay. Quản trị viên thiết lập chế độ của từng nhóm. Mỗi người giữ chìa khóa tự đặt ra sự đồng ý của mình thông qua [Sự đồng ý cho vay](#lending-consent).

Sự đồng ý là tỷ lệ phần trăm từ 0 đến 100 và thời hạn tùy chọn tính bằng mili giây kỷ nguyên. Chìa khóa sẽ cho vay phần trăm phần trăm không sử dụng đó trong khi thời hạn là trong tương lai.

Đối với một chiều, `L` là giới hạn hiệu quả: giới hạn kế hoạch nhân với số tài khoản trong nhóm. Cổng tính toán cho khóa yêu cầu:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` là trọng số của khóa hoặc `100 / n` cho mọi phím khi không có trọng số nào trên 0. `lend_k` là phần trăm hoạt động của khóa và 0 sau khi hết thời hạn. Sự đồng ý của chính khóa yêu cầu không bao giờ được tính. Khóa `hard` bị từ chối khi mức tiêu thụ của nó đạt đến phần cộng với `borrowAvailable`.

Công suất không có yêu cầu phân bổ (100 trừ đi tổng trọng số) sẽ không được cho vay. Không có chìa khóa đồng ý cho mượn nó.

**Ví dụ.** `L` là 1000.

| Chìa khóa | Cân nặng | Chia sẻ | tiêu thụ | Cho vay |
| --------- | -------- | ------- | -------- | ------- |
| MỘT       | 50       | 500     | 530      | 0%      |
| B         | 30       | 300     | 100      | 50%     |
| C         | 0        | 0       | 60       | 0%      |

- B cho vay 50% trong số 200 nhàn rỗi, tức là 100. C đã chiếm 60 trên phần của mình. A có thể vay 40.
- A được phục vụ ở mức 530 và bị từ chối khi mức tiêu thụ của nó đạt 540.
- Trước khi C sử dụng bất cứ thứ gì, với A bằng hoặc dưới phần của mình, C có thể vay 100.
- Trước khi C sử dụng bất cứ thứ gì, với A là 530, C có thể vay 70.

**Không trọng lượng.** Khóa có trọng số 0 có phần chia là 0. Nó chỉ được phục vụ khi mức tiêu thụ của nó thấp hơn mức người khác cho vay. Khi không có ai cho vay, nó sẽ bị từ chối ngay từ yêu cầu đầu tiên.

**Thời hạn.** Không có tác vụ nền nào hết hạn sự đồng ý. Mỗi yêu cầu so sánh thời hạn với thời gian của chính nó và thời hạn bằng thời gian đó đã trôi qua. Thời hạn được lưu trữ không phải là số hữu hạn hoặc đã qua ngày lớn nhất mà `Date` có thể giữ, được tính là đã vượt qua.

**`soft` và `burst`.** Việc cho vay không giới hạn họ. Khóa `soft` sẽ bị hủy ưu tiên sau khi vượt quá phần chia sẻ của nó. Khóa `burst` được chuyển trong khi hồ bơi còn chỗ. Trần bể bơi vẫn từ chối mọi chìa khóa khi tổng số bể bơi đạt đến giới hạn.

**Chi phí trên đường dẫn yêu cầu.** Một nhóm `saturation` không đọc được gì nhiều hơn trước. Trong nhóm `consent`, một thứ nguyên có thể đếm được chỉ đọc các khóa khác cho khóa `hard` bằng hoặc cao hơn chia sẻ của nó trong khi một khóa khác cho mượn. Sau đó, nó thực hiện song song một lần đọc trên mỗi khóa khác. Một lần đọc không thành công được tính là mức tiêu thụ bằng 0 cho khóa đó. Thứ nguyên `percent` thêm không đọc vì sổ ghi công chứa mọi khóa.

**Chỉnh sửa một hồ bơi.** Một chỉnh sửa giữ sự đồng ý của các phím ở lại. Điều này áp dụng cho các chỉnh sửa phân bổ, thay thế toàn nhóm và các lệnh gọi `ensure`. Khóa bị xóa sẽ mất sự đồng ý và khóa được thêm lại bắt đầu từ 0. Các tuyến quản trị sẽ trả lại sự đồng ý của từng khóa và không bao giờ ghi lại. Việc chuyển một nhóm trở lại `saturation` sẽ giữ lại mọi sự đồng ý được lưu trữ, điều này không có tác dụng trong chế độ đó. Việc chuyển nhóm sang `consent` một lần nữa sẽ kích hoạt lại các sự đồng ý đã lưu trữ chưa hết thời hạn. Người giữ khóa có thể xóa sự đồng ý đã lưu trữ ở một trong hai chế độ.

**Đang nâng cấp.** Nếu các cột `lending_percent` và `lending_until` đã tồn tại thì quá trình di chuyển chỉ thêm `borrow_mode` và tỷ lệ phần trăm được lưu trữ vẫn giữ nguyên. Mọi nhóm đều bắt đầu ở chế độ `saturation`. Bật `consent` trên mỗi nhóm trong trình hướng dẫn nhóm. Không có gì được suy ra từ các giá trị được lưu trữ.

**Hạn chế.**

- Người cho vay có thể xác định mức vốn góp ở mức trần trước khi sử dụng phần vốn của chính mình. Công suất mà người khác mượn được tính vào tổng số của nhóm.
- Việc kiểm tra diễn ra trước yêu cầu và không dự trữ gì. Các yêu cầu đồng thời đọc mức tiêu thụ trước khi bất kỳ yêu cầu nào được ghi lại, do đó, dung lượng cho mượn có thể được sử dụng nhiều lần, bị giới hạn bởi các yêu cầu trong chuyến bay. Kiểm tra chia sẻ của chế độ `saturation` có cùng thuộc tính.

---

## Bộ đếm cửa sổ trượt

Được triển khai trong `src/lib/quota/sqliteQuotaStore.ts` và `redisQuotaStore.ts`.

Hai bucket cho mỗi `(apiKeyId, dimensionKey)`:

- `curr`: bucket hiện tại (`floor(nowMs / windowMs)`)
- `prev`: bucket trước đó (`curr - 1`)

Giá trị trượt hiệu dụng:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Độ chính xác**: chính xác khoảng 99%. Sai số tối đa là 1% kích thước cửa sổ tại
ranh giới giữa các bucket (vốn có trong phép xấp xỉ 2 bucket).

### Đồng thời

Trình điều khiển SQLite: mutex trong bộ nhớ cho mỗi khóa `(apiKeyId | dimensionKey)` ngăn chặn
tình trạng tranh chấp đọc-sửa-ghi. Mẫu này tương tự cơ chế chống thundering-herd của `src/sse/services/auth.ts`.

Trình điều khiển Redis: tập lệnh Lua EVAL để tăng nguyên tử — chạy dưới dạng một lệnh Redis duy nhất.

---

## Trình điều khiển

### SQLite (mặc định, không cần cài đặt)

- Bảng: `quota_consumption` (xem migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Phù hợp nhất cho các triển khai đơn phiên bản.
- Toàn bộ dữ liệu lưu trữ bền vững nằm trong DB SQLite hiện có của OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (tùy chọn, đa phiên bản)

- Yêu cầu package npm `ioredis`.
- Các bộ đếm được lưu trong Redis; siêu dữ liệu (pool/phân bổ) vẫn được lưu trong SQLite.
- Phù hợp nhất cho các triển khai nhiều replica, nơi các bộ đếm phải được chia sẻ.

### Chuyển đổi trình điều khiển

Thông qua giao diện cài đặt (`/dashboard/settings` → Quota Store), hoặc thông qua các biến môi trường:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Cài đặt DB được ưu tiên hơn biến môi trường. Nếu `driver=redis` nhưng thiếu URL hoặc
`ioredis` chưa được cài đặt, factory sẽ quay về sử dụng SQLite và ghi log cảnh báo.

Thứ tự lựa chọn trình điều khiển:

1. Cài đặt DB `quotaStore.driver`
2. Biến môi trường `QUOTA_STORE_DRIVER`
3. Mặc định: `sqlite`

---

## Đa chiều

Một hồ bơi có thể có nhiều chiều. Mỗi chiều là độc lập:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Ví dụ: kế hoạch Codex** (5h% + hàng tuần%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Một yêu cầu phải đáp ứng tất cả các kích thước để được phép.

### Thứ nguyên phần trăm: phân bổ cho mỗi khóa

Gói phần trăm báo cáo một con số sử dụng cho mỗi tài khoản và khoảng thời gian gói. Nhà cung cấp không cung cấp bộ đếm cho mỗi khóa API.

Để phân chia con số đó cho các khóa, mỗi nhóm sẽ giữ một sổ ghi công cho mỗi tài khoản và khoảng thời gian kế hoạch. `src/lib/quota/percentLedger.ts` nắm giữ các quy tắc của cuốn sách. `src/lib/quota/percentAttribution.ts` biến cuốn sách thành những con số mà cơ quan thực thi sử dụng. Kết quả là ước tính được xây dựng từ các mã thông báo trên mỗi tuyến đường chính.

#### Những bài đọc làm di chuyển cuốn sách

Cuốn sách chỉ di chuyển theo hình riêng của nhà cung cấp cho cửa sổ kế hoạch được yêu cầu. Các kết nối này báo cáo một:

| nhà cung cấp                    | Kế hoạch cửa sổ |
| ------------------------------- | --------------- |
| Claude, thông qua kết nối OAuth | `5h`, `weekly`  |
| Codex                           | `5h`, `weekly`  |

Những điều này không được tính là một bài đọc:

- phản hồi mà khách hàng của nhà cung cấp đánh dấu là cũ
- một cửa sổ Claude có tỷ lệ phần trăm mà nhà cung cấp không báo cáo
- hình của một cửa sổ khác hoặc trường hợp xấu nhất trên các cửa sổ
- dự phòng tiêu đề giới hạn tỷ lệ
- đọc thất bại

Các nhà cung cấp khác, bao gồm Claude có khóa API, không có sách. Mỗi khóa được tính bằng 0 trên kích thước phần trăm của chúng, như trước khi có thay đổi này.

Việc đọc chia sẻ bộ đệm 30 giây của tín hiệu bão hòa. Giá trị đọc Claude được xác định theo thời điểm hình ảnh được quan sát trong tiêu đề phản hồi hoặc được đọc từ điểm cuối sử dụng khi biết thời điểm đó. Các bài đọc khác được ghi ngày tháng khi mục nhập bộ đệm đó được tạo.

#### Cuốn sách lưu giữ những gì

Mỗi yêu cầu được ghi lại sẽ thêm mã thông báo của nó một lần vào bộ đếm cho mỗi nhóm, tài khoản và khóa. Một quầy chỉ phát triển. Cuốn sách giữ ba điều:

- đường cơ sở: con số khi cuốn sách được mở ra hoặc cửa sổ được xoay lần cuối
- hình áp dụng cuối cùng
- mỗi khóa, bộ đếm mã thông báo của nó tại cùng thời điểm đó, được gọi là dấu của nó

Sách được cập nhật khi quá trình thực thi hoặc lộ trình sử dụng tính toán phân bổ. Các bài viết được so sánh và đặt trên một số sửa đổi. Một nhà văn thua cuộc sẽ thử lại một lần trong lần đọc mới.

#### Cách tính phần của khóa

Mỗi phần của khóa được tính khi đọc sách. Sự tăng trưởng của con số kể từ đường cơ sở được phân chia giữa các khóa theo tỷ lệ với các mã thông báo mà mỗi mã được định tuyến kể từ điểm của nó.

Together, các mã thông báo đó giải thích tối đa một điểm của con số trên mỗi mã thông báo `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (mặc định là 1.000). Sự tăng trưởng mà họ không giải thích được là ở bên ngoài. Đường cơ sở cũng là bên ngoài.

Ví dụ: một cuốn sách mở ở mức 0. Khóa A sau đó định tuyến 900.000 mã thông báo và khóa B định tuyến 100.000. Ở hình 60, phần của A là 54 điểm và phần của B là 6.

Bộ đếm bên dưới dấu khóa của nó đã khởi động lại và đếm đầy đủ. Một khóa không có dấu, chẳng hạn như khóa tham gia nhóm ở giữa cửa sổ, sẽ đếm tất cả các mã thông báo của nó. Một con số làm chậm các mã thông báo sẽ gây ra lỗi và lỗi sẽ biến mất ở lần đọc tiếp theo. Nó không tích lũy.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` được đọc trên mọi thuộc tính. Giá trị không phải là số hữu hạn ít nhất là 1 sẽ giảm xuống 1.000.

#### Việc đọc thay đổi cuốn sách như thế nào

Quy tắc so khớp đầu tiên được áp dụng:

1. **Chưa có cuốn sách nào:** việc đọc mở cuốn sách. Hình của nó là đường cơ sở và mọi bộ đếm đều được đánh dấu.
2. **Đọc cũ hơn:** ngày đọc trước lần áp dụng cuối cùng sẽ bị bỏ qua. Số đọc có thời gian đặt lại sớm hơn 30 phút so với số được lưu trữ cũng vậy.
3. **Cửa sổ nhà cung cấp mới:** thời gian đặt lại muộn hơn 30 phút so với thời gian đã lưu sẽ lật sách. Hình này trở thành đường cơ sở và mọi bộ đếm đều được đánh dấu lại. Chìa khóa không có bộ đếm để lại cuốn sách.
4. **Cửa sổ kết thúc:** thời gian đặt lại được lưu trữ không sau thời gian đọc dữ liệu có nghĩa là cửa sổ đó đã kết thúc. Việc đọc lật cuốn sách, bất kể hình dạng của nó.
5. **Hình cao hơn:** chỉ có hình cuối cùng di chuyển. Đường cơ sở và điểm đánh dấu vẫn ở lại.
6. **Hình tương tự:** con số, đường cơ sở và nhãn hiệu ở lại. Chỉ có một thời gian thiết lập lại cuốn sách thiếu được viết.
7. **Hình dưới:** một con số thấp hơn không bao giờ được áp dụng như vậy. Nó chỉ lật sách khi có ba điều giữ vững. Nó mới hơn ít nhất hai phút so với lần đọc được áp dụng cuối cùng. Không có gì nói rằng cửa sổ đang mở giống nhau. Nó thấp hơn một điểm.

Cửa sổ được tính là cùng một cửa sổ mở khi có ba thứ được giữ. Cả hai thời gian thiết lập lại đều được biết đến. Họ cách nhau 30 phút. Cái được lưu trữ vẫn còn ở phía trước của việc đọc. Hình thấp hơn bên trong cửa sổ đó không thay đổi gì cả.

Thời gian đặt lại chỉ được lưu trữ khi nó nhanh hơn thời gian đọc dữ liệu mang nó. Con số cao hơn sẽ lưu trữ thời gian đặt lại giá trị đọc của nó khi thời gian đó có thể sử dụng được và giữ thời gian được lưu trữ trong trường hợp ngược lại. Một con số bằng nhau chỉ ghi lại thời gian thiết lập lại việc đọc khi cuốn sách không có. Nó không thay đổi gì khác. Một con số thấp hơn mà không lật sổ sách không có thời gian thiết lập lại.

#### Khi cuốn sách được sử dụng

Sau khi đọc, cuốn sách sẽ được sử dụng trừ khi thời gian đặt lại được lưu trữ của nó không sau thời gian hiện tại. Trường hợp đó phát sinh khi một kết quả đọc được thực hiện ngay trước khi thiết lập lại, chẳng hạn như kết quả được cung cấp từ bộ đệm, được quan sát ngay sau đó.

Nếu không có giá trị đọc có thể sử dụng được, sách đã lưu chỉ được sử dụng khi nó vẫn có thể là sách của cửa sổ hiện tại. Điều đó đúng trong hai trường hợp:

- thời gian thiết lập lại của nó đã được biết và vẫn còn ở phía trước
- nó không có thời gian đặt lại và lần đọc cuối cùng đã thay đổi nó tối đa là 15 phút

Nếu không thì không có gì được quy cho, như khi không có sách. Sách đã hết thời gian đặt lại được lưu trữ sẽ không bao giờ bị tính phí.

#### Thực thi

Mức tiêu thụ của khóa theo thứ nguyên phần trăm là phần được quy cho nó cộng với phần của phần bên ngoài. Phần bên ngoài trước tiên sử dụng yêu cầu công suất không phân bổ (100 trừ đi tổng trọng số). Chỉ có phần thừa được chia sẻ giữa các phím theo trọng lượng.

Mức tiêu thụ đó được so sánh với phần chia sẻ hợp lý của khóa như đối với bất kỳ khía cạnh nào khác. Chế độ nghiêm ngặt vẫn bắt đầu khi tín hiệu bão hòa đạt `QUOTA_SATURATION_THRESHOLD` (mặc định 0,5). Mỗi con số được chia tỷ lệ theo giới hạn hiệu quả: giới hạn mỗi tài khoản nhân với số lượng tài khoản trong nhóm.

Giới hạn tuyệt đối với `capUnit: "percent"` chỉ tính phần được gán cho khóa, được chia tỷ lệ theo cùng một cách. Lấy giới hạn cho mỗi tài khoản là 100 và k tài khoản. Sau đó, đạt đến giới hạn N khi phần khóa trong số liệu của tài khoản phục vụ đạt đến điểm N/k. Mỗi tài khoản được kiểm tra dựa trên sổ sách riêng của mình. Ví dụ: với hai tài khoản, giới hạn 10 đạt được ở 5 điểm trên con số của một tài khoản.

Khi không thể đọc được cửa hàng, không có gì được phân bổ và mọi khóa đều bị tính phí bằng 0 trên chiều đó. Khi việc viết sách không thành công, ghi công đó sẽ sử dụng cuốn sách như nó đã được đọc. Việc ghi mã thông báo không thành công sẽ khiến mã thông báo của yêu cầu đó bị loại khỏi sách. Không có lỗi nào trong số này chặn một yêu cầu.

Trong nhóm `consent`, công thức cho vay sử dụng mức tiêu thụ của từng khóa theo thứ nguyên phần trăm như được mô tả ở trên. Khi cho mượn một chìa khóa khác, cuốn sách sẽ được đọc một lần và gán cho mọi chìa khóa. Nếu không có sổ sử dụng được thì mỗi chìa khóa sẽ bị tính phí 0. Một chìa khóa có trọng số sẽ được chuyển đi và một chìa khóa có trọng số 0 chỉ được chuyển khi một chìa khóa khác cho mượn.

#### Lộ trình sử dụng

`GET /api/quota/pools/{id}/usage` báo cáo những con số giống nhau thông qua cùng một chức năng. Thứ nguyên phần trăm có một mục nhập cho mỗi kết nối nhóm trong `accounts`. `consumedTotal` và `perKey` cấp cao nhất của nó phản ánh mục nhập đầu tiên.

Tuyến đường cũng áp dụng cách đọc hiện tại, vì vậy nó có thể nâng cấp cuốn sách theo yêu cầu. `internal + external` có thể khác với `consumedTotal` khi không có số đọc có thể sử dụng được hoặc khi không áp dụng số thấp hơn.

#### Lưu trữ và lưu giữ

Cả hai cửa hàng hạn ngạch đều giữ sổ sách. Trên SQLite, tính năng dọn dẹp cơ sở dữ liệu tự động, khi được bật, sẽ xóa các hàng không được cập nhật trong 60 ngày. Trên Redis, sổ sách và bộ đếm của kết nối nhóm chia sẻ một khóa. Nó hết hạn sau 60 ngày kể từ lần viết mã thông báo hoặc thay đổi sách cuối cùng. Một cuốn sách không thay đổi sẽ không được viết lại, vì vậy điểm giới hạn được đặt phía trên khung kế hoạch dài nhất. Việc đặt lại lịch sử sử dụng thủ công cũng xóa sách trên SQLite (xem Giới hạn).

#### Hạn chế

- Tất cả sự tăng trưởng của số liệu tài khoản kể từ đường cơ sở được chia cho các mã thông báo mà mỗi khóa được định tuyến kể từ đó. Khi nào sự tăng trưởng đó xảy ra không thành vấn đề.
- Vì vậy, việc sử dụng bên ngoài OmniRoute sẽ được tính vào các khóa theo mức mà mã thông báo của chúng cho phép. Điều đó bao gồm việc sử dụng được thực hiện trước yêu cầu đầu tiên của khóa đối với cửa sổ, khi sách đã được mở.
- Ví dụ: Sử dụng bên ngoài tăng tài khoản 60 điểm trong khi không có tuyến đường chính. Sau đó, một khóa sẽ định tuyến 30.000 mã thông báo và con số này đạt tới 60,6.
- Nếu cuốn sách đã được mở trước khi sử dụng thì phần chìa khóa là 30 điểm. Nó cũng mang 7,65 mức sử dụng bên ngoài, với bốn phím có trọng lượng 25.
- Nếu cuốn sách được mở sau lần sử dụng đó thì 60 điểm là giá trị cơ bản. Phần của chìa khóa là 0,6 điểm và nó mang 15 điểm sử dụng bên ngoài.
- Một yêu cầu hoặc một lượt truy cập vào lộ trình sử dụng sẽ mở ra cuốn sách. Vì vậy, việc sử dụng như vậy có được tính là đường cơ sở hay không tùy thuộc vào thời điểm mở sách.
- Với tầng mặc định, một khóa định tuyến 60.000 mã thông báo trong khi sử dụng bên ngoài sẽ tăng tài khoản lên 60 điểm sẽ nhận được tất cả 60 điểm như một phần riêng của nó.
- Với mức sàn 50.000, phần mình được 1,2 điểm. 58,8 còn lại là bên ngoài và được tính theo trọng lượng, giống như bất kỳ cách sử dụng bên ngoài nào.
- Đặt `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` gần với chi phí một điểm trong kế hoạch của bạn. Việc sử dụng bên ngoài bao gồm lưu lượng truy cập trên cùng một tài khoản từ các khóa bên ngoài nhóm.
- Giới hạn phần trăm được áp dụng ở mọi chế độ. Khóa bị giới hạn có thể bị từ chối khi tài khoản ở dưới ngưỡng bão hòa rất nhiều.
- Lấy nắp 10 và 12 điểm sử dụng bên ngoài sớm hơn trong cửa sổ. Một khóa định tuyến 20.000 mã thông báo sau đó sẽ bị từ chối với tỷ lệ tài khoản là 12,4%.
- Sự phân chia là ước tính theo khối lượng mã thông báo. Một yêu cầu được tính là mã thông báo nhắc nhở cộng với mã thông báo hoàn thành của nó. Giảm giá bộ nhớ đệm và giá mẫu không thay đổi số lượng đó.
- Yêu cầu không kết thúc với trạng thái 200 không ghi lại mã thông báo nào. Ví dụ như luồng mà máy khách ngắt kết nối và lỗi ngược dòng sau khi sử dụng hết.
- Việc sử dụng yêu cầu như vậy được tính cho các khóa đã ghi mã thông báo, tùy theo mức độ mã thông báo của chúng cho phép. Phần còn lại là bên ngoài. Nó không di chuyển trở lại. Phản hồi báo cáo không có hồ sơ sử dụng mã thông báo cũng không có mã thông báo.
- Việc sử dụng một yêu cầu đang diễn ra có thể hiển thị trong phần khóa hoạt động khác cho toàn bộ yêu cầu. Nó chỉ quay trở lại khi yêu cầu kết thúc với trạng thái 200.
- Việc sử dụng đã có trong tài khoản khi mở sách được tính là bên ngoài. Điều này bao gồm việc nâng cấp, nhóm mới và tài khoản mới. Việc sử dụng trong một cửa sổ mới trước lần đọc đầu tiên cũng được tính là bên ngoài.
- Mỗi khóa bắt đầu với phần trọng lượng của việc sử dụng đó, sau khi không có yêu cầu phân bổ dung lượng. Với một tài khoản ở mức 85% và năm phím có trọng số 20, mỗi phím bắt đầu với 17 trong số 20 phím được sử dụng.
- Trong nhóm có nhiều tài khoản, số liệu của tài khoản phân phát sẽ được áp dụng cho ngân sách tổng hợp. Điều này không thay đổi theo cuốn sách.
- Con số thấp hơn bên trong cửa sổ mà nhà cung cấp báo cáo là đang mở không được áp dụng. Thời gian đặt lại lùi lại hơn 30 phút được coi là số đọc cũ.
- Trong cả hai trường hợp, sách sẽ giữ nguyên trạng thái cho đến khi hết thời gian đặt lại đã lưu. Sau đó, cuốn sách sẽ không bị tính phí cho đến khi đọc xong.
- Biện pháp khắc phục là thiết lập lại lịch sử sử dụng thủ công (`POST /api/settings/purge-usage-history`). Nó xóa sổ ghi công và bộ đếm mã thông báo của chúng trong cơ sở dữ liệu SQLite.
- Thời kỳ `all` xóa mọi cuốn sách và quầy. Khoảng thời gian ngắn hơn trước tiên sẽ xóa những cuốn sách không được viết trong đó. Sau đó, nó sẽ xóa các bộ đếm không được ghi bên trong nó mà chỉ dành cho kết nối nhóm không còn sách. Một cuốn sổ được lưu giữ vẫn đánh dấu từng chiếc chìa khóa trên quầy của nó.
- Một cuốn sách có hình không di chuyển sẽ không được viết lại, do đó, thời gian ngắn hơn cũng có thể xóa cuốn sách của cửa sổ hiện tại. Lần đọc tiếp theo sẽ mở ra một cuốn sách mới ở hình hiện tại.
- Việc đặt lại không chạm vào kho hạn ngạch Redis. Ở đó, một cuốn sách kết thúc bằng cửa sổ của nó hoặc hết hạn sau 60 ngày kể từ lần viết cuối cùng.
- Khi nhà cung cấp không gửi thời gian đặt lại, một cửa sổ đặt lại và nạp lại phía trên con số cũ giữa hai lần đọc sẽ trông giống như con số cao hơn. Cuốn sách giữ nguyên đường cơ sở và nhãn hiệu cũ.
- Các bài đọc được ghi ngày theo đồng hồ địa phương. Khi nó chạy trước nhà cung cấp hoặc một nguồn báo cáo thời gian đặt lại sớm hơn một chút, cuốn sách có thể sớm đưa ra sự khác biệt đó.
- Sự tăng trưởng trong khoảng thời gian ngắn đó được chia cho số token được định tuyến trong đó. Lần đọc đầu tiên của cửa sổ tiếp theo sẽ sửa nó. Khi cuốn sách đã lật không có thời gian đặt lại, việc chỉnh sửa đó cần một con số thấp hơn ít nhất hai phút so với lần đọc được áp dụng cuối cùng.
- Các phiên bản dùng chung chỉ số ngày lưu trữ Redis với đồng hồ của riêng chúng, vì vậy hãy luôn đồng bộ hóa các đồng hồ đó. Số đọc của một phiên bản có đồng hồ chạy phía sau trông cũ hơn và bị bỏ qua.
- Khi không có kết quả đọc nào có thể sử dụng được sau thời gian đặt lại đã lưu, phần trăm chia sẻ và giới hạn phần trăm trên mỗi khóa sẽ không được thực thi cho đến khi kết quả đọc trở lại. Nếu không có thời gian đặt lại, quá trình này sẽ bắt đầu sau 15 phút kể từ lần đọc cuối cùng đã thay đổi cuốn sách.
- Trên cửa hàng Redis, một cuốn sách không hoạt động trong 60 ngày có thể hết hạn kể từ khi người viết nhận được séc cho đến khi viết cuốn sách đó. Sau đó nó được tạo lại ở bản sửa đổi trên 1, đây là trạng thái hợp lệ.

---

## Bộ phân giải gói

Được triển khai trong `src/lib/quota/planResolver.ts`.

Thứ tự ưu tiên (từ cao xuống thấp):

1. **Ghi đè thủ công trong DB** — bảng `provider_plans`, theo từng `connectionId`.
2. **Danh mục đã biết** — `src/lib/quota/planRegistry.ts` (chỉ chứa dữ liệu).
3. **Gói trống** — không có chiều nào, yêu cầu cấu hình thủ công.

### Danh mục đã biết

| Nhà cung cấp          | Các chiều                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, chưa xác định), `tokens/weekly`         |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Không có mặc định — yêu cầu cấu hình thủ công                 |

---

## Tích hợp đường ống

### móc PRE (`open-sse/handlers/chatCore.ts`)

Chạy trước bộ thực thi ngược dòng, sau khi kiểm tra chính sách và xác thực:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Không mở được** : nếu `enforceQuotaShare` ném, yêu cầu sẽ được cho phép thông qua nhật ký `pino.warn`. Điều này ngăn lỗi động cơ hạn ngạch chặn tất cả lưu lượng truy cập.

**Khi năng lực trở lại.** Việc từ chối chia sẻ chìa khóa hoặc ở trần hồ bơi kết thúc bằng một trong hai câu, ở cả hai phương thức mượn:

- cửa sổ `percent` : `. The <window> window resets at <time>.` Thời gian thiết lập lại các báo cáo của nhà cung cấp.
- Đơn vị đếm được: `. Enough <window> usage is expected to clear by <time>.` Thời gian là giới hạn trên của cửa sổ trượt, nếu phím không gửi gì khác.

`<time>` là ISO 8601 ngay lập tức trong UTC. Việc từ chối sau đó mang theo `Retry-After`: toàn bộ số giây cho đến thời điểm đó, cộng thêm một. Một khách hàng chờ lâu như vậy sẽ thử lại nhiều nhất một giây sau thời điểm đó. Khi không biết thời điểm, lời từ chối không mang theo câu cũng như tiêu đề. Việc từ chối giới hạn tuyệt đối cũng không mang lại điều gì. Mã công khai vẫn là `quota_share_blocked`.

Việc từ chối chia sẻ không ảnh hưởng đến kết nối được chia sẻ. Nó không có thời gian hồi chiêu, không có khóa mô hình và không có lỗi ngắt của nhà cung cấp, đồng thời các khóa khác của nhóm vẫn tiếp tục được phục vụ. Khi mọi mục tiêu của combo từ chối chìa khóa chia sẻ của nó, combo sẽ trả lời 429 mà không cần chờ đợi. Câu trả lời của nó mang gợi ý là `Retry-After`. Đường dẫn nhúng kết thúc việc từ chối bằng cùng một câu và không gửi `Retry-After`.

### móc POST (tiêu thụ kỷ lục)

Sau khi phản hồi thành công:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**nốt nhạc trôi** : nếu `consume` không phản hồi sau, bộ đếm lăn sẽ đếm dưới mức. Tín hiệu bão hòa từ nhà cung cấp (ví dụ `anthropic-ratelimit-unified-5h-utilization`) sẽ sửa ước tính chung cho yêu cầu tiếp theo.

### Combo phạt nhẹ (`open-sse/services/combo.ts`)

Khi `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Hình phạt được áp dụng sau tất cả các yếu tố ghi điểm khác. Nó làm giảm xác suất tự động kết hợp của việc chọn một khóa bão hòa mà không chặn nó.

---

## hướng dẫn UI

### `/dashboard/costs/quota-share` — Trang nhóm chính

Các thành phần (tất cả đều có trong `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Thành phần             | Mục đích                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| `QuotaConceptCard`     | Thẻ giới thiệu giải thích việc chia sẻ hạn ngạch cho người dùng mới     |
| `CreatePoolModal`      | Tạo nhóm hạn ngạch mới (phân bổ ban đầu tên + kết nối + )               |
| `PoolCard`             | Tóm tắt trên mỗi nhóm: tên, kết nối, số lượng phân bổ                   |
| `DimensionBar`         | Thanh xếp chồng theo chiều: tỷ lệ sử dụng toàn cầu + của mỗi khóa       |
| `AllocationTable`      | Bảng có tiêu thụ, chia sẻ công bằng, deficit/surplus, cờ mượn           |
| `BurnRateChart`        | biểu đồ đường tốc độ ghi EMA (Recharts lười biếng qua `dynamic()`)      |
| `EditAllocationsModal` | Chỉnh sửa trọng số phân bổ, giới hạn và chính sách cho một nhóm         |
| `BorrowModeField`      | Bộ chọn chế độ mượn (`saturation` hoặc `consent`) trong trình hướng dẫn |
| `LendingBadge`         | Huy hiệu chỉ đọc trên khóa cho vay, chỉ trong nhóm `consent`            |

Huy hiệu cho vay hiển thị tỷ lệ phần trăm và khi được đặt, thời hạn tính bằng UTC với vùng được đặt tên. Nó đánh giá thời hạn tại thời điểm chụp nhanh mức sử dụng. Thời hạn đã hết hạn hoặc không thể đọc được hiển thị dưới dạng `lending expired`.

Các trang móc:

- `usePools` — lấy `GET /api/quota/pools` cứ sau 30 giây.
- `usePoolUsage` — lấy `GET /api/quota/pools/[id]/usage` theo yêu cầu.
- `useLocalStoragePoolMigration` — chạy một lần trên mount để di chuyển dữ liệu LS cũ.

Bước phím của trình hướng dẫn nhóm có hộp `Show usage by member to key holders`. Nó đặt tùy chọn `memberBreakdown` của nhóm (xem [Cách sử dụng của Thành viên](#member-usage) ). Bên dưới nó, trình hướng dẫn cảnh báo rằng ai đó biết một phím nào được sử dụng có thể khớp một ô nhịp với phím đó. Với hộp được đánh dấu, nó sẽ hiển thị như vậy khi bước liệt kê ít hơn ba hoặc nhiều hơn 20 phím, vì các thanh sẽ được ẩn. Nó đếm các khóa trong bước và không thể biết khóa nào trong số chúng có thể đưa ra yêu cầu.

### `/dashboard/costs/quota-share/plans` — Cấu hình gói nhà cung cấp

- `ProviderPlanConfigClient.tsx`: thả xuống để chọn nhà cung cấp, xem gói đã giải quyết (tự động từ danh mục hoặc ghi đè thủ công) và chỉnh sửa thứ nguyên.
- Các thay đổi ghi vào `PUT /api/quota/plans/[connectionId]`.
- Việc xóa sẽ hoàn nguyên về danh mục hoặc gói trống.

---

## Hạn ngạch tự phục vụ API (chọn tham gia)

`GET /api/v1/me/quota/{provider}` (cũng được phục vụ tại `/v1/me/quota/{provider}`) cho phép người giữ khóa API đọc, bằng khóa riêng của họ, lượng đăng ký dùng chung là của họ và điều gì đang chặn họ. Tuyến đường là một lớp vỏ mỏng trên `src/server/selfService/quotaHandler.ts`; chế độ xem được xây dựng bởi `src/lib/quota/selfView.ts` và hợp đồng phản hồi của nó là `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Kích hoạt và xác thực

- Cờ tính năng `QUOTA_SELF_PANEL`, `false` mặc định . Khi nó tắt, yêu cầu đến tuyến đường sẽ nhận được 404. Với `REQUIRE_API_KEY=true`, chính sách API của khách hàng từ chối khóa bị thiếu hoặc không hợp lệ với 401 trước khi tuyến đường chạy, bất kể cờ nào. Yêu cầu không có khóa nhưng phiên bảng điều khiển đã đăng nhập sẽ vượt qua chính sách đó và nhận được câu trả lời của chính tuyến. Cờ này phân giải giống như mọi cờ khác (ghi đè bảng điều khiển hoặc REST, sau đó là biến môi trường cùng tên); xem [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Tên hiển thị của mỗi nhóm và nhãn của từng lịch trình được trả lại cho người giữ chìa khóa của nhóm chính xác như quản trị viên đã viết. Trước khi bật cờ, hãy kiểm tra xem chúng có phù hợp để những người giữ chìa khóa đó đọc được hay không.
- Khóa chỉ được đọc từ các tiêu đề: `Authorization: Bearer <key>` hoặc `x-api-key: <key>`. Khi cả hai đều được gửi, cái đầu tiên xác nhận sẽ được sử dụng. Một khóa trong chuỗi truy vấn hoặc cookie sẽ bị bỏ qua. Khóa môi trường của máy chủ bị từ chối (401).
- Chìa khóa cần có phạm vi `self:usage` (403 không có nó).
- Phân đoạn nhà cung cấp được cắt bớt, viết thường và kiểm tra theo `^[a-z0-9][a-z0-9._-]{0,63}$` (400 nếu không), sau đó được giải quyết thông qua cơ quan đăng ký nhà cung cấp, do đó, một bí danh như `cc` sẽ đọc các nhóm `claude`. `claude` và `anthropic` đọc cùng một nhóm.

### Mỗi chế độ hiển thị hiển thị điều gì

| Khả năng hiển thị | Yêu cầu                                                                                   | Trường                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chia sẻ riêng     | `self:usage`                                                                              | `pools[]` (ref, tên, nhà cung cấp, chính sách, trọng lượng, giới hạn), `dimensions[].yourShare`, `accounts[]` với `yourShare` (trên cửa sổ `percent` không có `attributed` và `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`              |
| Cấp tài khoản     | `self:usage` + `self:account-quota` và nhà cung cấp trong `sharedQuotaProviders` của khóa | thêm `dimensions[].total`, `accounts[].dimensions[].account` và `accounts[].modelWindows`, `attributed` và `external` trên `yourShare` của cửa sổ `percent` và `members` trên một nhóm có mức sử dụng thành viên được bật (xem [Member Usage](#member-usage) ) |

- `sharedQuotaProviders` là cài đặt cho mỗi khóa (`PUT /api/keys/[id]/self-service`): `null`, mặc định, có nghĩa là mọi nhà cung cấp mà khóa tiếp cận; `[]` có nghĩa là không có. `accountVisible` của mỗi nhóm cho biết khả năng hiển thị nào được áp dụng cho nó.
- Thanh tài khoản và cửa sổ mô hình chỉ được hiển thị cho các tài khoản có kết nối mà khóa có thể sử dụng. Khi khóa có danh sách các kết nối được phép, tài khoản bên ngoài khóa đó sẽ giữ mục nhập `Account N` mà không có `account` hoặc `modelWindows`. Danh sách trống có nghĩa là không có hạn chế, như đối với `/v1/me/status`. Tổng số nhóm (`dimensions[].total`) không phụ thuộc vào danh sách đó.
- Chỉ riêng hai số liệu được hiển thị bằng `self:usage` là do việc sử dụng các phím khác. `exhausted` của ngân sách lịch trình phản ánh mức tiêu thụ của mọi khóa theo lịch trình đó. Trong một nhóm có trọng số bằng 0, `weight` của khóa là `100 / number of members`. Cả hai đều là những gì việc thực thi áp dụng cho khóa.
- Một nhóm chỉ được xác định bởi `ref`, một giá trị mờ được liên kết với khóa gọi. Tên hiển thị của nó (`name`) được bao gồm khi quản trị viên viết nó. `ref` có nguồn gốc từ khóa và nhóm có bí mật khóa API của máy chủ (`API_KEY_SECRET`). Khách hàng không được duy trì nó: nó sẽ thay đổi nếu bí mật đó được xoay vòng.
- Các tài khoản được liệt kê là `Account 1`, `Account 2`, … theo thứ tự nhóm. Không có id nhóm, id kết nối, e-mail tài khoản hoặc tên tài khoản nào được trả về và phản hồi đi qua lược đồ hợp đồng, loại bỏ bất kỳ trường nào bên ngoài nó.
- Các đơn vị có thể đếm được (`requests`, `tokens`, `usd`) được báo cáo là nhóm nhóm mà cổng hạn ngạch thực thi: `limit` = kế hoạch giới hạn tài khoản × trong nhóm, `fairShare` = trọng lượng / 100 × `limit` (chia đều khi mỗi trọng số là 0), `consumed` = bộ đếm riêng của khóa trong kho hạn ngạch, `remaining` = `fairShare` − `consumed`, nổi ở mức 0.
- `blocks.schedules` liệt kê các khoảng thời gian lịch trình của khóa (`open`/`closed`, `blackout` hoặc `outside-window`, `retryAfterSeconds`, số tầng dự trữ và liệu ngân sách của cửa sổ đó có được chi tiêu hay không); `blocks.modelCaps` liệt kê mức tiêu thụ theo giờ cho mỗi mô hình.
- Một khóa bên ngoài mỗi nhóm của nhà cung cấp sẽ nhận được 200 với `pools: []`; `availableModels` (id `qtSd/` mà khóa nhìn thấy trong `/v1/models`), `expiresAt` và `apiBaseUrl` vẫn được điền.
- `apiBaseUrl` là `OMNIROUTE_PUBLIC_API_BASE_URL`, sau đó `OMNIROUTE_PUBLIC_BASE_URL`, nếu không thì `null`. Nó không bao giờ là nguồn gốc riêng của yêu cầu.

### `status` và `reason`

| `status`      | Nghĩa                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Một bài đọc hiện tại.                                                                                                                                                                                                                                                                                                                                                                 |
| `stale`       | Tài khoản được lưu trong bộ nhớ đệm được đánh dấu là cũ hoặc tài khoản đã hết thời gian đặt lại kể từ khi đọc. Các con số được giữ lại. Một cửa sổ mô hình có thời gian đặt lại đã trôi qua sẽ đánh dấu toàn bộ nhóm `modelWindows` `stale`. Đối với chia sẻ riêng của khóa đối với cửa sổ `percent` : sách đã được đọc mà không cần đọc tài khoản trong bộ đệm của cổng để xác nhận. |
| `unavailable` | Không đọc; các con số là `null`, không bao giờ `0`. `reason` nói lý do tại sao.                                                                                                                                                                                                                                                                                                       |

| `reason`                          | Khi                                                                                                                                           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Không thể đọc được kho hạn ngạch hoặc không thể đọc được sách ghi công.                                                                       |
| `percent_attribution_unavailable` | Phần riêng của khóa trong cửa sổ `percent` : chưa có sổ ghi công nào tồn tại cho tài khoản và cửa sổ đó hoặc sách không liệt kê khóa.         |
| `percent_window_ended`            | Phần riêng của khóa trong cửa sổ `percent` : cuốn sách thuộc về cửa sổ kế hoạch đã kết thúc.                                                  |
| `account_not_used_by_key`         | Phần riêng của khóa trong cửa sổ `percent` : kết nối của tài khoản nằm ngoài các kết nối được phép của khóa. Cuốn sách của nó không được đọc. |
| `window_not_reported`             | Bộ nhớ đệm giới hạn của nhà cung cấp không có chức năng đọc cho cửa sổ gói đó.                                                                |
| `connection_lookup_failed`        | Không thể đọc được kết nối của tài khoản.                                                                                                     |
| `not_supported`                   | OmniRoute không thể đọc giới hạn sử dụng của nhà cung cấp tài khoản.                                                                          |
| `fetch_failed`                    | Không thể đọc được trong bộ nhớ đệm và không thể làm mới giới hạn của nhà cung cấp.                                                           |
| `not_available`                   | Việc đọc không có cửa sổ sử dụng hoặc tài khoản không có lượt đọc nào cả.                                                                     |

Khi không thể đọc được kho hạn ngạch, các trường `blocks` được cửa hàng hỗ trợ ( `exhausted` của ngân sách lịch trình, `consumed` và `reached` của giới hạn mô hình) cũng là `null`.

### Đồng ý cho vay

`PATCH /api/v1/me/quota/{provider}` ghi lại sự đồng ý của chính khóa gọi cho một nhóm. Nó sử dụng cờ, tiêu đề và quy tắc nhà cung cấp của `GET`. Phạm vi `self:usage` cho phép ghi này, mặc dù tên của nó đọc là chỉ đọc.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` là `ref` mà `GET` trả về cho nhóm đó.
- `lendingPercent` là một số nguyên từ 0 đến 100. Giá trị 0 thể hiện sự đồng ý và thời hạn của nó. Phần thân có `lendingPercent` 0 được chấp nhận ở cả hai chế độ.
- `lendingUntil` là tùy chọn: epoch mili giây hoặc `null` không có thời hạn. Nó phải ở trong tương lai và nhiều nhất là 86400000000000000. Giá trị dưới 100000000000 sẽ đọc dưới dạng giây và bị từ chối.
- Bất kỳ lĩnh vực nào khác đều bị từ chối. Phần thân dài hơn 4096 byte sẽ bị từ chối. Quá trình đọc dừng ở kích thước đó, do đó phần thân dài hơn không bao giờ được giữ nguyên.

Việc kiểm tra diễn ra theo thứ tự của bảng này. Mọi lời từ chối đều sử dụng nội dung lỗi tiêu chuẩn với một thông báo cố định. Việc từ chối một trong những tấm séc này sẽ không ghi gì cả.

| Trạng thái | Tin nhắn                                                                                           | Khi                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 404        | `Not found`                                                                                        | Cờ `QUOTA_SELF_PANEL` đã tắt.                                           |
| 401        | `Valid API key required`                                                                           | Khóa bị thiếu hoặc không hợp lệ hoặc là khóa môi trường của máy chủ.    |
| 403        | `API key lacks the self:usage scope`                                                               | Chìa khóa thiếu `self:usage`.                                           |
| 400        | `Invalid provider`                                                                                 | Phân đoạn nhà cung cấp không hợp lệ.                                    |
| 429        | `Too many lending changes. Retry later.`                                                           | Chìa khóa đã vượt quá giới hạn của nó. Câu trả lời mang `Retry-After`.  |
| 400        | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Nội dung không phải là JSON, quá dài hoặc không khớp với lược đồ.       |
| 400        | `lendingUntil must be a Unix time in milliseconds`                                                 | Thời hạn được tính bằng giây.                                           |
| 400        | `lendingUntil must be in the future`                                                               | Thời hạn là vào hoặc trước thời điểm yêu cầu.                           |
| 404        | `Pool not found`                                                                                   | Tên `ref` không có nhóm khóa này cho nhà cung cấp này.                  |
| 403        | `Lending is not enabled for this pool`                                                             | Nhóm ở chế độ `saturation` và `lendingPercent` trên 0.                  |
| 500        | `Failed to build quota view`                                                                       | Bất kỳ thất bại nào khác. Nguyên nhân của nó được ghi lại trên máy chủ. |

Giới hạn là 20 yêu cầu trong 60 giây cho mỗi phím. Mọi yêu cầu vượt qua quá trình kiểm tra của nhà cung cấp đều được tính, thậm chí một yêu cầu bị từ chối sau đó hoặc một yêu cầu không thay đổi gì. Nó có bộ đếm riêng, ngoài giới hạn tốc độ yêu cầu của khóa.

Yêu cầu thay đổi sự đồng ý được lưu trữ sẽ ghi một bản ghi kiểm tra `quota.pool.lending.updated`. Nó đặt tên cho khóa bằng các giá trị cũ và mới. Cùng một cơ quan được gửi hai lần viết một lần và kiểm tra một lần. Câu trả lời là 200 với chế độ xem `GET` đầy đủ, được tạo sau khi viết.

Chế độ xem `GET` báo cáo việc cho vay như sau:

- Mỗi nhóm mang `borrowMode` (`saturation` hoặc `consent`) và `lendingPercent` và `lendingUntil` riêng của khóa.
- `lendingActive` chỉ là `true` trong nhóm `consent`, với tỷ lệ phần trăm trên 0 và chưa đạt đến thời hạn.
- Trong nhóm `consent`, mỗi `dimensions[].yourShare` đếm được sẽ mang `borrowAvailable`. Đó là thứ mà chiếc chìa khóa hiện tại có thể sử dụng trên phần chia sẻ của nó, được các chiếc chìa khóa khác cho mượn.
- `borrowAvailable` sử dụng công thức cổng. Nó đọc mọi khóa khác ngay cả khi khóa đó nằm dưới sự chia sẻ của nó. Đối với khóa `hard`, song song đó là một lần đọc bổ sung cho mỗi khóa khác và thứ nguyên có thể đếm được.
- `borrowAvailable` là `null` cho khóa `soft` hoặc `burst` và `null` khi đọc không thành công.
- `borrowAvailable` là một con số cho tất cả các khóa khác cộng lại. Trong một nhóm gồm hai chìa khóa, nó là hình của chính chiếc chìa khóa kia.
- `borrowAvailable` chưa được báo cáo cho cửa sổ `percent` hoặc `accounts[]`.
- Trong nhóm `saturation` chế độ xem báo cáo sự đồng ý được lưu trữ với `lendingActive: false` và không có `borrowAvailable`.

### Lỗi

Mọi phản hồi của tuyến đường này, dù thành công hay sai sót, đều mang `Cache-Control: no-store`. Việc từ chối xảy ra trước khi tuyến chạy không mang theo nó, ví dụ: 401 của chính sách API của máy khách hoặc 403 của bộ lọc IP Lỗi của tuyến sử dụng nội dung lỗi tiêu chuẩn với thông báo cố định: 400 (nhà cung cấp không hợp lệ), 401 (thiếu hoặc khóa không hợp lệ), 403 (thiếu `self:usage`), 404 (tắt cờ) và 500 (`Failed to build quota view`). 500 bao gồm mọi lỗi khi yêu cầu đến tuyến đường, bao gồm cả việc tra cứu khóa; nguyên nhân của nó được ghi vào máy chủ và không bao giờ được trả lại. Các lỗi của `PATCH` được liệt kê trong [Đồng ý cho vay](#lending-consent).

### Hạn chế

- `remaining` là một phần chia sẻ công bằng của khóa mà nó chưa sử dụng. Nó không phải là một sự đảm bảo. Chìa khóa vẫn có thể được phục vụ ngoài đó trong khi hồ bơi còn chỗ. Khi tổng số của nhóm đạt đến `limit`, mọi khóa của nhóm đều bị từ chối, bất kể `remaining` của chính nó là gì và một khóa không có `self:account-quota` sẽ không thể nhìn thấy tổng số đó.
- `remaining` không tính đến `cap` tuyệt đối của phân bổ. Việc thực thi sẽ từ chối khóa khi mức tiêu thụ của chính nó trong một cửa sổ của đơn vị giới hạn đạt đến giá trị của giới hạn.
- Thanh cấp tài khoản đến từ bộ nhớ đệm giới hạn của nhà cung cấp và có thể làm chậm quyết định thực thi vài phút. Giá trị đã hết thời gian đặt lại được báo cáo là `stale`.
- Cửa sổ trên mỗi mô hình (`modelWindows`) chỉ được báo cáo cho các nhà cung cấp có ánh xạ cửa sổ kế hoạch: Claude và Codex ngày nay. Đối với các nhà cung cấp khác, `modelWindows` vẫn hiển thị khi dữ liệu tài khoản được hiển thị, với danh sách `windows` trống.
- Tỷ lệ riêng của khóa trong cửa sổ `percent` là ước tính. Nó xuất phát từ sách ghi nhận tác giả và có mọi giới hạn được liệt kê trong phần "Phần trăm thứ nguyên: ghi nhận tác giả theo từng khóa" ở trên.
- `consumed` là số lượng thực thi so sánh với phần chia sẻ công bằng. Chính xác thì nó là `attributed` cộng `external`. `attributed` là phần mà cuốn sách cung cấp chìa khóa cho các mã thông báo mà nó đã định tuyến. `external` là một phần của khóa trong việc sử dụng tài khoản mà các khóa của nhóm không chiếm.
- Cả hai phần chỉ được gửi khi `accountVisible` của nhóm là đúng: khóa có `self:account-quota` và nhà cung cấp nằm trong `sharedQuotaProviders` của nó. Một khóa không có nó sẽ chỉ có `consumed`, có cùng `status` và `reason`.
- Với cả hai bộ phận và trọng lượng riêng của nó, người giữ có thể tính toán việc sử dụng bên ngoài hồ bơi và sạc vào chìa khóa của hồ bơi. Chủ sở hữu có phạm vi tài khoản đã nhìn thấy tổng tài khoản.
- Một khóa không định tuyến gì trong cửa sổ vẫn có thể đọc điện tích bên ngoài của nó từ `consumed`, vì phần quy cho của nó khi đó là 0.
- Ví dụ: một cuốn sách mở ở số 0, với các phím A và B có trọng số 50 mỗi phím. Khóa A định tuyến 900.000 mã thông báo và khóa B 100.000. Sau đó, tài khoản đạt 60% giới hạn 100. Khi đó `attributed` là 54 cho khóa A và 6 cho khóa B và `external` là 0 cho cả hai.
- Chế độ xem đọc sách và không bao giờ ghi trạng thái của nó. Nó không mở một cuốn sách và không bao giờ yêu cầu nhà cung cấp đọc sách. Với cửa hàng Redis, thao tác đọc sẽ loại bỏ các trường sửa đổi được thay thế ở chế độ nền, giống như thao tác đọc của cổng.
- Chia sẻ chỉ là `ok` trong khi bộ đệm của cổng lưu giữ việc đọc tài khoản. Nếu không có nó thì nó là `stale`, vì vậy trong một nhóm không có yêu cầu gần đây, nó có thể đã lỗi thời.
- Cho đến khi một yêu cầu đi qua nhóm, việc chia sẻ sẽ không khả dụng. Yêu cầu đó sẽ mở cuốn sách và số liệu của tài khoản tại thời điểm đó được tính là việc sử dụng được thực hiện bên ngoài nhóm.
- Trong một nhóm có nhiều tài khoản, mỗi mục nhập tài khoản sẽ sử dụng sổ riêng của tài khoản đó và giới hạn của một tài khoản. Việc thực thi chia tỷ lệ cho cả hai bên theo số lượng tài khoản nên tỷ lệ là như nhau.
- Cửa sổ trên mỗi mô hình không có chia sẻ khóa. Cuốn sách không giữ dữ liệu cho mỗi mô hình.
- Các tầng dự trữ của lịch trình không được đánh giá theo chế độ xem: lịch trình có thể hiển thị dưới dạng `open` trong khi yêu cầu bị từ chối với lý do `schedule-reserve`.
- Khi hai nhóm có cùng khóa chia sẻ một kết nối, việc thực thi sẽ áp dụng một trong số chúng và chế độ xem sẽ liệt kê cả hai.
- Không có giới hạn cho mỗi địa chỉ đối với các lần thử khóa không thành công: đằng sau proxy ngược, người gọi có thể chia sẻ một địa chỉ (điều này phụ thuộc vào việc địa chỉ máy khách được chuyển tiếp có đáng tin cậy hay không), do đó, việc khóa có thể từ chối tuyến đường đến mọi người giữ khóa. Với `REQUIRE_API_KEY=true`, chính sách API của khách hàng sẽ từ chối một khóa không hợp lệ trước khi tuyến chạy, với phần thân 401 của chính sách đó thay vì của tuyến này.

### Cách sử dụng của thành viên

Quản trị viên có thể cho phép người nắm giữ khóa xem cách phân chia việc sử dụng cửa sổ giữa các thành viên của nhóm. Tùy chọn là `memberBreakdown` của nhóm, được tắt theo mặc định. Nó được thiết lập trong trình hướng dẫn nhóm hoặc với `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` và `GET /api/quota/pools/{id}` báo cáo nó.

Một thứ nguyên của chế độ xem chỉ mang `members` khi tất cả những điều này giữ:

- tùy chọn của hồ bơi đang bật
- nhóm có tối đa 20 khóa được phân bổ và ít nhất ba trong số đó có thể đưa ra yêu cầu: đang hoạt động, không bị thu hồi, không bị cấm và chưa hết hạn
- `accountVisible` của nhóm là đúng: khóa có `self:account-quota` và nhà cung cấp nằm trong `sharedQuotaProviders` của nó
- trên cửa sổ `percent`, kết nối của tài khoản là một trong những khóa có thể sử dụng
- phần riêng của khóa của cửa sổ đó đã được đọc: `status` của nó không phải là `unavailable`

Nếu không thì `members` vắng mặt. Nó không bao giờ là một danh sách trống.

- Mỗi lát là `{ slot, consumed, isYou }`. Lược đồ phản hồi từ chối bất kỳ thuộc tính nào khác trên một lát và danh sách hơn 20 lát. Các lát được liệt kê theo thứ tự vị trí.
- Có một lát cho mỗi khóa được phân bổ, bao gồm một khóa không thể thực hiện yêu cầu nữa. Một thành viên không được sử dụng sẽ hiển thị số 0 thực sự.
- Khe 1 luôn là chìa khóa yêu cầu, với `isYou` đúng. Các số vị trí khác là cấp bậc của hàm băm có khóa. Nó được khóa bằng `API_KEY_SECRET` và bao gồm nhóm, khóa yêu cầu và thành viên.
- Vì vậy, các con số không xếp hàng giữa những người nắm giữ. Đối với một người giữ, họ giữ nguyên giữa các lần truy cập. Chúng có thể thay đổi khi một khóa tham gia hoặc rời khỏi nhóm hoặc khi bí mật đó được xoay.
- Trên cửa sổ đếm được, một slice là bộ đếm của thành viên trong kho hạn ngạch, cùng bộ đếm với `consumed` của chính nó.
- Trên cửa sổ `percent` một lát cắt là phần `attributed` của thành viên, từ cùng một cuốn sách được đọc dưới dạng phần chia sẻ của chính khóa. Việc sử dụng bên ngoài hồ bơi không bao giờ được chia thành các phần. Điện tích đó được chia theo trọng lượng, vì vậy các lát mang nó sẽ hiển thị trọng lượng.
- Mỗi chế độ xem đọc song song một giá trị cho mỗi thành viên khác và cửa sổ có thể đếm được. Trên cửa sổ `percent` các lát cắt không được đọc ngoài phần đọc sách của chính phần chia sẻ. Khi không thể đọc được một giá trị, cửa sổ đó không có `members` và phần chia sẻ của khóa vẫn giữ nguyên.
- Tùy chọn và số lượng khóa có thể sử dụng được đọc một lần trên mỗi nhóm và chỉ dành cho khóa có thể xem dữ liệu tài khoản. Việc đọc không thành công tùy chọn hoặc số lượng phím có thể sử dụng sẽ tắt các thanh cho nhóm đó. Máy chủ ghi lại cảnh báo và phần còn lại của chế độ xem sẽ được tạo.

Các thanh không có tên hoặc id. Họ vẫn kể cho người nắm giữ chìa khóa những điều về các thành viên khác:

- Người nắm giữ vẫn có thể khớp các lát theo giá trị của chúng.
- Việc đánh số ổn định cho phép người nắm giữ theo dõi một thành viên theo thời gian.
- Số lát cho biết có bao nhiêu khóa được phân bổ trong nhóm.
- Trong một nhóm gồm ba khóa, ai đó biết khóa nào được sử dụng có thể cho biết khóa cuối cùng được sử dụng là gì.
- Khi nhóm giảm xuống dưới ba phím có thể sử dụng được, các thanh sẽ biến mất. Lượt xem được thực hiện trước đó vẫn hiển thị những gì từng thành viên đã sử dụng.
- Trên cửa sổ đếm được, tổng nhóm trừ đi các lát có thể hiển thị việc sử dụng các khóa không còn được phân bổ.
- Một thành viên hiển thị số 0 trên một tài khoản và sử dụng trên tài khoản khác có thể hiển thị thành viên nào sử dụng tài khoản nào.
- Trong một nhóm có thể đếm được với chính sách `hard`, một lát ngừng phát triển ở mức chia sẻ công bằng của một thành viên gợi ý về trọng lượng của thành viên đó.

### Chuỗi cách sử dụng (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (cũng được cung cấp tại `/v1/me/usage`) trả về mức sử dụng và chi phí cho các yêu cầu riêng của khóa gọi: tổng cộng, một mục nhập mỗi UTC ngày, mỗi ngày và kiểu máy, mỗi kiểu máy và mỗi nhà cung cấp. Nó chia sẻ cờ, quy tắc xác thực, phạm vi `self:usage`, `Cache-Control: no-store` và hành vi lỗi của tuyến hạn ngạch ở trên. Khóa được kiểm tra trước `range`. Các lỗi là 400 (`Invalid range`), 401, 403, 404 và 500 (`Failed to build usage`).

- `range` là một trong `1d`, `7d`, `30d` (mặc định) hoặc `90d`. Bất kỳ giá trị nào khác, giá trị trống hoặc tham số lặp lại đều là 400. Tập hợp dừng ở `90d` để giới hạn chi phí của cuộc gọi. Chế độ xem chỉ đọc lịch sử sử dụng thô, không bao giờ đọc bản tóm tắt hàng ngày, không có khóa.
- Các hàng được chọn theo id của phím gọi. Cột tên khóa không bao giờ khớp và các hàng được ghi không có id khóa sẽ không bao giờ được tính.
- Việc xây dựng một chuỗi sẽ chạy năm truy vấn được nhóm trên các hàng của khóa trong cửa sổ. Chuỗi đã xây dựng được sử dụng lại trong 60 giây cho mỗi phím và phạm vi và không có cuộc gọi nào được sử dụng lại. `generatedAt` của nó cho tuổi của nó.
- Cửa sổ kết thúc khi chuỗi được xây dựng. Một hàng được đóng dấu sau đó, chẳng hạn như do đồng hồ lệch, sẽ không được tính.
- `coverage.retentionDays` là cài đặt lưu giữ lịch sử sử dụng thô của nhà điều hành (`retention.usageHistory` trong cài đặt cơ sở dữ liệu). `coverage.truncatedByRetention` đúng khi phạm vi được yêu cầu dài hơn cài đặt đó. Nó so sánh hai số và không kiểm tra xem các hàng có thực sự bị thiếu hay không.
- Nhà cung cấp được trả về dưới dạng được ghi lại cho các yêu cầu riêng của khóa. Model là tên được ghi sau `/` cuối cùng của nó và các hàng được nhóm theo nó. Yêu cầu kết hợp có mọi mục tiêu bị từ chối sẽ được ghi lại với nhãn định tuyến là nhà cung cấp (tên kết hợp `auto` hoặc `combo`) và chuỗi mô hình mà khách hàng đã gửi. Các yêu cầu bị từ chối khác, chẳng hạn như do bộ ngắt mạch mở, thời gian hồi chiêu của mô hình hoặc bỏ qua hạn ngạch đỗ, hãy giữ nguyên nhà cung cấp và mô hình mục tiêu.
- Bên cạnh số lượng và chi phí, phản hồi còn có độ trễ trung bình, tỷ lệ thành công và thời gian của yêu cầu đầu tiên và cuối cùng.
- `byModel` liệt kê 50 cặp nhà cung cấp và mô hình có nhiều yêu cầu nhất. Với nhiều cặp hơn, các mục nhập của nó không cộng lại thành `summary` và `summary.uniqueModels` tính mọi cách viết mô hình đã ghi. Khi đó `byModelTruncated` là đúng và một mô hình có các cặp nằm ở cả hai phía của đường cắt sẽ hiển thị tổng một phần.
- Hai chi phí được báo cáo. `costUsd` là chi phí được lập hóa đơn, như phân tích sử dụng cho thấy điều đó. Các nhà cung cấp dịch vụ đăng ký giá cố định, chẳng hạn như gói Mã Claude, được tính $0 ở đó. `listPriceUsd` là mức sử dụng tương tự được định giá theo giá niêm yết, bao gồm cả đăng ký. Yêu cầu có mô hình không có hàng giá sẽ tính chi phí được lưu trữ: chi phí mà nhà cung cấp đã báo cáo hoặc chi phí được tính khi yêu cầu được ghi lại. Chỉ một yêu cầu không được tính là 0, không có điểm đánh dấu, do đó tổng số có thể là một phần.
- Hợp đồng phản hồi là `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Trang tự phục vụ

Khi bật `QUOTA_SELF_PANEL`, `/quota/{provider}` là một trang công khai. Người giữ khóa nhập khóa API vào đó và xem nhóm khóa đó dành cho nhà cung cấp. Mỗi nhóm hiển thị một thẻ trên mỗi cửa sổ nhóm, với mục đích sử dụng nhóm dành cho mọi người và phần riêng của chìa khóa. Mỗi tài khoản của pool đều có thẻ riêng, tùy theo mục đích sử dụng của tài khoản và phần chia của key. Việc sử dụng tài khoản chỉ xuất hiện khi key có thể xem được dữ liệu tài khoản. Trang này cũng liệt kê các giới hạn cho mỗi kiểu máy của từng tài khoản và cách sử dụng khóa riêng. Thông báo hiện ra khi có lịch chặn key ngay lúc này. Một thẻ liệt kê mọi giới hạn trên mỗi mẫu mã cùng với cách sử dụng của nó và đánh dấu những giới hạn đã đạt được. `{provider}` là id nhà cung cấp hoặc bí danh của nó (`/quota/claude`, `/quota/cc`). Một nhà cung cấp không xác định và mọi đường dẫn `/quota/*` trong khi cờ tắt, câu trả lời 404. Nhóm trên nút tương thích với OpenAI- hoặc Anthropic tùy chỉnh không có trang. API vẫn trả lời cho họ.

Trang này không có phiên. Khóa chỉ được gửi trong tiêu đề `Authorization` của `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` và `GET /api/v1/me/usage`, không bao giờ được gửi trong URL. Khóa mà máy chủ chấp nhận được lưu trong `sessionStorage` của tab. Thay vào đó, với "Ghi nhớ trên thiết bị này", nó được giữ ở dạng `localStorage` và "Quên khóa" sẽ xóa nó khỏi cả hai. Khóa mà máy chủ từ chối sẽ bị xóa khỏi bộ lưu trữ.

Một nhóm ở chế độ `consent` hiển thị thẻ cho vay. Ở đó, người giữ chìa khóa đặt toàn bộ phần trăm từ 0 đến 100 phần chia không sử dụng của chìa khóa để cho vay. Chủ sở hữu cũng chọn thời gian đồng ý kéo dài: cho đến khi tắt, 1 giờ, 8 giờ, 24 giờ, 7 ngày hoặc 30 ngày. Thời lượng được tính kể từ thời điểm lưu. Trong khi thời hạn có hiệu lực, người nắm giữ có thể giữ nó. Nếu thời hạn đó trôi qua trước khi Lưu, thẻ sẽ không gửi gì và yêu cầu lựa chọn khác. Với 0% không có thời hạn được gửi. Thẻ hiển thị thời hạn được lưu trữ với múi giờ được đặt tên. Sự đồng ý đã qua thời hạn được coi là đã kết thúc.

Đối với khóa `hard` thẻ cũng liệt kê, trên mỗi cửa sổ nhóm, những khóa nào khác được sử dụng cho khóa ngay bây giờ. Mỗi hàng là một hình cho tất cả các phím khác cùng nhau. Trong một nhóm gồm hai chìa khóa, nó là hình của chính chiếc chìa khóa kia. Một con số mà chế độ xem không báo cáo được đọc là không có sẵn, không phải bằng 0. Đối với khóa `soft` hoặc `burst` thẻ cho biết không áp dụng con số nào.

Một nhóm ở chế độ `saturation` có khóa lưu trữ tỷ lệ phần trăm trên 0 chỉ hiển thị lệnh rút tiền. Nó nói rằng tỷ lệ phần trăm được lưu trữ không có tác dụng ở đó. Nút Rút tiền của nó gửi 0 mà không có thời hạn. Nhóm ở chế độ `saturation` có số 0 được lưu trữ sẽ hiển thị không có thẻ cho vay. Sau khi lưu, thẻ mà chế độ xem được trả về không còn cần nữa sẽ vẫn giữ nguyên thông báo của thẻ đó cho đến khi chế độ xem của trang thay đổi lần nữa.

Không có gì được lưu cho đến khi người giữ nhấn Lưu hoặc Rút tiền. Mỗi lần nhấn sẽ gửi một yêu cầu `PATCH /api/v1/me/quota/{provider}` và lần nhấn thứ hai sẽ không gửi gì trong khi lần nhấn đầu tiên đang chờ xử lý. Phần thân mang `ref` mờ đục của hồ bơi từ chế độ xem, tỷ lệ phần trăm và thời hạn. Câu trả lời là chế độ xem hạn ngạch được xây dựng lại và trang hiển thị chế độ xem đó mà không cần đọc lần thứ hai. Khi hai lần lưu trùng nhau, trang sẽ đọc hạn ngạch một lần sau câu trả lời cuối cùng. Trang không lưu giữ sự đồng ý trong bộ nhớ của trình duyệt.

Thay đổi bị từ chối được giải thích trên thẻ bằng văn bản được chọn từ trạng thái HTTP. Phần thân lỗi không được đọc. Lỗi 401 cho biết khóa không được chấp nhận và tải lại hạn ngạch. 403 cho biết nhóm không thực hiện các thay đổi cho vay và 404 cho biết nhóm đã biến mất. Cả hai đều cung cấp một nút tải lại hạn ngạch. Câu trả lời 400 hoặc 4xx khác yêu cầu chủ sở hữu kiểm tra tỷ lệ phần trăm và thời hạn. Số 429 yêu cầu người giữ chờ, với số giây `Retry-After` khi câu trả lời đưa ra cho họ. Câu trả lời 5xx, 408 hoặc lỗi mạng cho biết thay đổi có thể chưa được lưu và giữ nguyên các giá trị đã nhập. Một câu trả lời bên ngoài hợp đồng sẽ tải lại hạn ngạch. Việc lưu không thành công sẽ không tự xóa khóa. Khi tải lại sau khi bị từ chối, trang sẽ xóa khóa như trên bất kỳ lần đọc nào bị từ chối.

Sau khi khóa được chấp nhận, trang này cũng hiển thị thẻ "Thiết lập công cụ của bạn" với ba tab. " Mã Claude " cung cấp khối `env` cho `~/.claude/settings.json`. "Shell" đưa ra các biến giống như dòng `export`. "Claude Desktop" cung cấp các giá trị cho cửa sổ suy luận của bên thứ ba. Các mô hình này là các mô hình chia sẻ hạn ngạch mà khóa có thể yêu cầu đối với nhà cung cấp đó. Khi không có danh sách nào như vậy đi kèm với khóa, thay vào đó, khối sẽ bật tính năng khám phá mô hình cổng. Địa chỉ cổng là nguồn gốc API công khai mà máy chủ báo cáo (`OMNIROUTE_PUBLIC_API_BASE_URL`, sau đó là `OMNIROUTE_PUBLIC_BASE_URL`). Khi cả hai đều không được đặt, thẻ sẽ hiển thị phần giữ chỗ và yêu cầu chủ sở hữu hỏi quản trị viên. Khóa được hiển thị dưới dạng trình giữ chỗ. "Bao gồm khóa của tôi" đặt toàn bộ khóa trong văn bản trên màn hình và nút sao chép sẽ sao chép. Điều đó kéo dài cho đến khi hộp bị xóa, chìa khóa bị quên hoặc bị thay thế hoặc trang bị bỏ lại. Thẻ không gửi yêu cầu và không cung cấp tải xuống tệp.

Việc đọc các dấu API `stale` được hiển thị có thể đã lỗi thời. Việc đọc nó đánh dấu `unavailable` được hiển thị cùng với lý do của nó, không bao giờ bằng 0.

Trên các gói phần trăm, trang sẽ rút ra phần chia sẻ của chính khóa khi API báo cáo nó. Nó nói rằng con số này là ước tính và đặt tên cho hai phần của nó. Giới hạn cho mỗi mô hình chỉ hiển thị tài khoản.

Khi một cửa sổ mang `members`, thẻ của nó cũng hiển thị một thanh có một phân đoạn cho mỗi thành viên, theo thứ tự vị trí. Đoạn của phím hỏi sử dụng màu nhấn. Các phân đoạn khác xoay quanh màu biểu đồ của chủ đề. Chú giải văn bản liệt kê mọi phân đoạn với giá trị của nó, vì vậy không có gì phụ thuộc vào màu sắc. Các phân đoạn được gắn nhãn `You` hoặc `Member N`, trong đó N là vị trí.

### Cổng dành riêng cho trang

`QUOTA_PANEL_PORT` mở trình nghe thứ hai chỉ phục vụ trang tự phục vụ. Nó tắt trừ khi biến được đặt. `QUOTA_PANEL_HOST` là địa chỉ liên kết và mặc định là `127.0.0.1`.

Người nghe chuyển tiếp các đường dẫn này đến cổng chính và trả lời 404 cho mọi đường dẫn khác:

| Con đường                                                                | Phục vụ                                  |
| ------------------------------------------------------------------------ | ---------------------------------------- |
| `/quota/{provider}`                                                      | trang                                    |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Hạn ngạch xem trang đọc                  |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Chuỗi sử dụng mà trang đọc               |
| `/_next/static/`                                                         | Tập lệnh, kiểu và phông chữ của bản dựng |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Biểu tượng                               |

`GET` và `HEAD` được chuyển tiếp mà không có nội dung. Một yêu cầu có nội dung cũng được chuyển tiếp: `PATCH` của đường dẫn xem hạn ngạch mà trang gửi để lưu lựa chọn cho vay. Bất kỳ phương pháp nào khác đều trả lời 404, ngoại trừ yêu cầu CONNECT, có kết nối bị đóng mà không có câu trả lời. Bất kỳ yêu cầu nào khác khai báo nội dung đều trả lời 404 và kết nối của nó bị đóng. Yêu cầu nâng cấp bị từ chối và kết nối của họ bị đóng. Đường dẫn có phân đoạn chấm hoặc điểm đánh dấu phân đoạn bị từ chối, như trên cổng API. Mục tiêu yêu cầu có ký tự bên ngoài có thể in được ASCII cũng vậy. Ký tự điều khiển thô trong mục tiêu được trình phân tích cú HTTP trả lời 400, trước khi kiểm tra riêng cổng này. Các tiêu đề yêu cầu mà khung dành riêng cho mục đích sử dụng riêng của nó không được chuyển tiếp: các tên bắt đầu bằng `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` hoặc `x-next-` và các tên `x-matched-path` và `next-resume`. Yêu cầu được chuyển tiếp mà không có chúng. Không thể truy cập bảng điều khiển, trang đăng nhập, API quản lý và các tuyến suy luận thông qua cổng này.

`PATCH` phải mang `Content-Type: application/json`, không có tham số hoặc chỉ có `charset=utf-8`. Nó phải mang một `Content-Length` từ 1 đến 4096, được viết dưới dạng chữ số đơn giản và không có `Transfer-Encoding`. Một `PATCH` vi phạm một trong các quy tắc này sẽ trả lời 404. Một số độ dài không đúng định dạng, chẳng hạn như độ dài có dấu hoặc lặp lại, được trình phân tích cú pháp HTTP trả lời 400 trước khi cổng này kiểm tra riêng. Cổng đọc các byte được khai báo trước khi liên lạc với cổng chính và đợi chúng tối đa 5 giây. Khi đó phần nội dung chưa hoàn chỉnh sẽ trả lời 404 và kết nối của nó bị đóng. Không có gì đến được cổng chính trong trường hợp đó hoặc khi khách hàng rời đi trước. Cổng chuyển tiếp chính xác các byte đã khai báo, có cùng `Content-Length`. Các byte sau chúng được đọc dưới dạng yêu cầu tiếp theo trên kết nối. Proxy ngược TLS ở phía trước phải chuyển tiếp `Content-Length` và không được chia nhỏ nội dung yêu cầu. Cổng chính kiểm tra khóa API trong tiêu đề `Authorization`, cũng như đối với `GET`.

Nội dung 404 là `{"error":"not_found","message":"Not found."}`. Rơle không thành công trả lời 502 (`api_bridge_unavailable`) hoặc 504 (`api_bridge_timeout`) không có trường `detail`.

Người nghe không đọc `QUOTA_SELF_PANEL` và không bật trang. Khi cờ tắt, trang và câu trả lời API của nó là 404 trên cổng chính và người nghe sẽ chuyển tiếp câu trả lời đó.

Trong máy chủ phát triển (`next dev`), trang không tương tác thông qua cổng này. Ổ cắm tải lại nóng đang phát triển là một yêu cầu nâng cấp và cổng từ chối nó. Sử dụng cổng chính trong khi phát triển.

Cổng phục vụ HTTP đơn giản và trang gửi khóa API. Giữ địa chỉ liên kết mặc định và đặt proxy ngược với TLS ở phía trước nó. Một địa chỉ liên kết không phải là loopback sẽ ghi lại thông báo này:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Một thiết bị loopback ngang hàng không gửi tiêu đề chuyển tiếp sẽ được tính là cục bộ trên cổng chính. Vì vậy, proxy trên cùng một máy chủ phải gửi `X-Forwarded-For`. Proxy trên địa chỉ riêng chỉ được tin cậy cho tiêu đề đó với `OMNIROUTE_TRUST_PROXY=private` (hoặc `lan`). Bất kỳ thiết bị ngang hàng nào khác đều được báo cáo theo địa chỉ kết nối của nó và các tiêu đề chuyển tiếp mà nó gửi sẽ bị loại bỏ.

Người nghe giữ tối đa 256 kết nối cùng một lúc. Khách hàng có 10 giây để gửi tiêu đề yêu cầu và 30 giây để gửi toàn bộ yêu cầu. Kết nối duy trì ở chế độ chờ sẽ đóng sau khoảng 5 giây. Một kết nối không có hoạt động trong 60 giây sẽ bị đóng. Những giá trị này là cố định. Đặt giới hạn kết nối và tốc độ trên proxy ngược ở phía trước. Proxy ngược ở phía trước phải giữ các kết nối ngược dòng không hoạt động trong ít hơn 5 giây hoặc không sử dụng lại chúng. Rơle đến cổng chính sử dụng thời gian chờ ngược dòng của cổng API (`API_BRIDGE_*`).

Trình nghe cũng bắt đầu khi `API_PORT` chưa được đặt. `QUOTA_PANEL_PORT` phải là cổng từ 1 đến 65535, chỉ được viết bằng chữ số. Nó phải khác với cổng bảng điều khiển và cổng API. Mặc dù máy chủ WebSocket trực tiếp được bật nhưng nó cũng phải khác với `LIVE_WS_PORT` (mặc định 20132). Bất kỳ giá trị nào khác sẽ không mở ra và ghi lại cảnh báo. Cảnh báo về giá trị bị từ chối đặt tên cho biến và không lặp lại giá trị. Một cổng đã được sử dụng sẽ không mở gì và ghi lại cảnh báo này:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Với bộ `OMNIROUTE_BASE_PATH`, người nghe mong đợi mọi đường dẫn phía trên dưới tiền tố đó. Sử dụng cùng một `OMNIROUTE_BASE_PATH` tại thời điểm xây dựng và thời gian chạy. Viết nó bằng dấu gạch chéo ở đầu và không có dấu gạch chéo ở cuối, ví dụ `/omniroute`. Một hình dạng khác, bao gồm `/` và `/omniroute/`, tắt cổng kèm theo một cảnh báo, mặc dù bản dựng chấp nhận các biểu mẫu đó. Đường dẫn cơ sở có phân đoạn đầu tiên đặt tên cho tuyến ứng dụng: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` hoặc `connect`, trong mọi trường hợp.

Hạn chế:

- `/quota/{provider}/` có dấu gạch chéo ở cuối câu trả lời 404 trên cổng này.
- Nhân viên dịch vụ và bảng kê khai ứng dụng web không được cung cấp trên cổng này.
- Biểu tượng yêu thích tùy chỉnh được đặt trong trang tổng quan không được hiển thị trên cổng này.
- Các biểu tượng không được hiển thị khi ứng dụng chạy dưới đường dẫn cơ sở.
- Cảng nói HTTP/1.1. đơn giản
- Liên kết không thành công sẽ không được thử lại cho đến khi quá trình khởi động lại.
- Người nghe không có giới hạn kết nối hoặc tốc độ cho mỗi địa chỉ khách hàng.
- Thiết lập vùng chứa không được đề cập trong phần này.

---

## Biến môi trường

| Biến                                 | Mặc định     | Sự miêu tả                                                                    |
| ------------------------------------ | ------------ | ----------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`     | Driver sử dụng: `sqlite` hoặc `redis`                                         |
| `QUOTA_STORE_REDIS_URL`              | _(trống)_    | Redis URL, ví dụ `redis://localhost:6379`                                     |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`        | 0..1; `>= threshold` kích hoạt chế độ nghiêm ngặt                             |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`       | Mã thông báo giải thích tối đa một điểm của cửa sổ kế hoạch phần trăm         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`        | 0..1; hệ số nhân cho điểm kết hợp chính sách mềm                              |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`         | Vài ngày trước khi GC loại bỏ các nhóm `quota_consumption` cũ                 |
| `QUOTA_PANEL_PORT`                   | _(chưa đặt)_ | Cổng dành riêng cho trang tự phục vụ. Bỏ đặt có nghĩa là không có người nghe. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`  | Liên kết địa chỉ cho cổng đó                                                  |

cài đặt DB (`quotaStore.*`) ghi đè các vars env.

---

## Khắc phục sự cố

### Redis đã được cấu hình nhưng không kết nối

Kiểm tra xem `ioredis` đã được cài đặt chưa (`npm ls ioredis`) và có thể truy cập
`QUOTA_STORE_REDIS_URL` hay không. Khi kết nối thất bại, factory sẽ chuyển sang
SQLite (được ghi nhật ký ở mức `warn`).

### `peek` trả về dữ liệu cũ / cho phép khi xảy ra lỗi

Nếu `peek` phát sinh ngoại lệ, `enforceQuotaShare` sẽ xử lý kết quả là "cho phép"
(cho phép khi xảy ra lỗi). Kiểm tra nhật ký `pino` để tìm các mục `quota:enforce`
và `quota:factory` nhằm xác định nguyên nhân gốc rễ.

### Sai lệch bộ đếm mức tiêu thụ

Nếu mức sử dụng thực tế của nhà cung cấp khác với các bộ đếm thì đây là điều có
thể dự kiến — cửa sổ trượt 2 bucket có sai số khoảng 1% tại các ranh giới cửa sổ,
và `consume` được thực thi theo kiểu gửi rồi không chờ sau phản hồi. Tín hiệu bão
hòa (`saturationSignals.ts`) đọc mức sử dụng thực tế của nhà cung cấp với TTL 30
giây và điều chỉnh `globalUsedPercent` tương ứng.

### Nhóm hiển thị "không có dữ liệu" cho tốc độ tiêu thụ

`computeBurnRate` yêu cầu ít nhất 2 mẫu lịch sử. Các nhóm mới chưa có lệnh gọi
`consume` trước đó sẽ hiển thị `tokensPerSecond: 0` và `timeToExhaustionMs: null`.

---

## Di chuyển từ localStorage

Khi `/dashboard/costs/quota-share` được tải lần đầu, hook `useLocalStoragePoolMigration`
sẽ kiểm tra:

1. `localStorage.getItem("omniroute:quota-share:pools")` không rỗng.
2. `GET /api/quota/pools` trả về `[]` (DB đang trống).

Nếu cả hai điều kiện đều đúng, hook sẽ gửi từng pool cũ đến `POST /api/quota/pools` theo lô,
sau đó xóa khóa localStorage. Quá trình di chuyển có tính lũy đẳng: điều kiện 2 ngăn việc
di chuyển lại.

---

## Phân loại chiến lược nội bộ

`quota-share` là một chiến lược định tuyến **chỉ dành cho nội bộ** (`INTERNAL_ROUTING_STRATEGY_VALUES` trong
`src/shared/constants/routingStrategies.ts`). Chiến lược này được sử dụng riêng cho các tổ hợp pool `qtSd/`
do hệ thống tạo và được cố ý loại khỏi `ROUTING_STRATEGY_VALUES` để không bao giờ
xuất hiện dưới dạng tùy chọn mà người dùng có thể chọn trong UI hoặc API.

---

## Phạm vi kiểm tra

Hai lớp bảo hiểm tự động được cung cấp với công cụ chia sẻ hạn ngạch:

| Suite                    | Yêu cầu                                                                | Nó bao gồm những gì                                                                                                                                                                                                       |
| :----------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Đơn vị (29 bài kiểm tra) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | công cụ lập lịch DRR, đo bão hòa, giới hạn đồng thời, toán fairShare, xếp hàng tồn đọng                                                                                                                                   |
| Ma trận tích hợp         | `npm run test:combo:matrix`                                            | Quyết định định tuyến từ đầu đến cuối thông qua đường ống kết hợp thực sự; DRR công bằng + khử độ bão hòa thông qua các đường nối trực tiếp (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Ma trận tích hợp chạy trong CI cùng với tất cả 22 chiến lược công khai. Bộ đơn vị có thể chạy độc lập.

---

## Tóm tắt lược đồ DB

Ba bảng được thêm bằng cách di chuyển `078`, `079` và `085`:

- định nghĩa nhóm `quota_pools` + `quota_allocations` — và phân bổ theo từng khóa.
- `quota_consumption` — cán quầy 2 thùng mỗi `(apiKeyId, dimensionKey)`.
- ghi đè gói nhà cung cấp thủ công `provider_plans` — (kích thước JSON trên mỗi connectionId).

Tất cả các bảng được thêm thông qua di chuyển `CREATE TABLE IF NOT EXISTS` bình thường.

Cho vay được chấp thuận thêm ba cột: `quota_allocations.lending_percent` (số nguyên, 0 mặc định), `quota_allocations.lending_until` (epoch mili giây hoặc `NULL` không có thời hạn) và `quota_pools.borrow_mode` ( `saturation` mặc định). Quá trình di chuyển của nó chỉ thêm các cột này và không ghi hàng hiện có.

Sổ phân bổ phần trăm thêm `quota_percent_ledger` (một hàng cho mỗi nhóm, cửa sổ tài khoản và gói) và `quota_percent_ledger_tokens` (một bộ đếm mã thông báo cho mỗi nhóm, tài khoản và khóa API ). `src/lib/db/quotaPercentLedger.ts` đọc và ghi chúng.
